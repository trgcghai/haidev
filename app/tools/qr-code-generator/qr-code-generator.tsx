"use client";
import { useRef, useState } from "react";
import { ReactQRCode, type ReactQRCodeRef } from "@lglab/react-qr-code";
import { Button } from "@/components/ui/button";
import { CopyIcon, Download } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";

interface QrCodeGeneratorProps {
  title: string;
  description: string;
}

const QrCodeGenerator = ({ title, description }: QrCodeGeneratorProps) => {
  const ref = useRef<ReactQRCodeRef>(null);
  const [value, setValue] = useState("");

  const download = () => {
    ref.current?.download({
      name: "Haidev-QR-" + format(new Date(), "yyyy-MM-dd-HH-mm-ss"),
      format: "png",
      size: 1000,
    });
  };

  const copy = async () => {
    try {
      if (!ref.current) return;

      const svgElement = ref.current.svg as SVGSVGElement;

      const svgString = new XMLSerializer().serializeToString(ref.current.svg!);
      const svgBlob = new Blob([svgString], {
        type: "image/svg+xml;charset=utf-8",
      });
      const URL = window.URL || window.webkitURL || window;
      const blobURL = URL.createObjectURL(svgBlob);

      const image = new Image();
      image.src = blobURL;

      image.onload = async () => {
        // Create a Canvas and draw the image onto it
        const canvas = document.createElement("canvas");
        canvas.width = svgElement.clientWidth;
        canvas.height = svgElement.clientHeight;

        const context = canvas.getContext("2d");
        context!.drawImage(image, 0, 0, canvas.width, canvas.height);

        // Convert Canvas to PNG Blob and copy to clipboard
        canvas.toBlob(async (pngBlob) => {
          if (!pngBlob) {
            throw new Error("Không thể tạo file ảnh PNG từ SVG");
          }

          try {
            await navigator.clipboard.write([
              new ClipboardItem({
                [pngBlob.type]: pngBlob,
              }),
            ]);
            toast.success("Copied!");
          } catch (clipError) {
            console.error(clipError);
            toast.error("Failed to copy!");
          }

          // Cleanup
          URL.revokeObjectURL(blobURL);
        }, "image/png");
      };

      image.onerror = () => {
        toast.error("Failed to copy!");
        console.error("Failed to load SVG image for copying.");
        URL.revokeObjectURL(blobURL);
      };
    } catch (error) {
      console.error("Failed to copy QR code:", error);
      toast.error("Failed to copy!");
    }
  };

  return (
    <main className="flex w-full flex-col gap-8">
      <div>
        <h1
          data-slot="doc-title"
          className="screen-line-bottom text-3xl font-semibold text-primary line-clamp-2 text-ellipsis"
        >
          {title}
        </h1>
        <p className="mt-2 text-muted-foreground">{description}</p>
      </div>

      <div className="grid grid-cols-3 gap-8">
        <div className="space-y-2 col-span-2">
          <Textarea
            value={value}
            onChange={(event) => setValue(event.target.value)}
            placeholder="Enter string"
            maxLength={2000}
          />
        </div>

        <div className="col-span-1 flex flex-col items-center justify-center gap-8">
          <div className="rounded-lg h-fit w-fit overflow-hidden">
            <ReactQRCode
              background="#fff"
              marginSize={2}
              ref={ref}
              size={256}
              value={value}
            />
          </div>
          <div className="flex flex-col items-center justify-center w-3xs gap-4">
            <Button onClick={download} className="w-full">
              <Download className="size-4" />
              Download
            </Button>
            <Button onClick={copy} className="w-full">
              <CopyIcon className="size-4" />
              Copy
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default QrCodeGenerator;
