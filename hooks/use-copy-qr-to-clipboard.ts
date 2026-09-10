"use client";

import { useCallback, useRef, useState } from "react";
import { useTiks } from "@rexa-developer/tiks/react";
import { useWebHaptics } from "web-haptics/react";
import { CopyState } from "@/hooks/use-copy-to-clipboard";

export type UseCopyQRToClipboardOptions = {
  onCopySuccess?: (text: string) => void;
  onCopyError?: (error: Error) => void;
  resetDelay?: number;
};

export function useCopyQRToClipboard({
  onCopySuccess,
  onCopyError,
  resetDelay = 1500,
}: UseCopyQRToClipboardOptions = {}) {
  const [state, setState] = useState<CopyState>("idle");
  const resetTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { trigger: haptic } = useWebHaptics();
  const { success: tiksSuccess, error: tiksError } = useTiks();

  const copy = useCallback(
    async (data: SVGSVGElement) => {
      // Clear any pending reset
      if (resetTimeoutRef.current) {
        clearTimeout(resetTimeoutRef.current);
      }

      try {
        const svgString = new XMLSerializer().serializeToString(data);
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
          canvas.width = data.clientWidth;
          canvas.height = data.clientHeight;

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
              onCopySuccess?.("Copied!");
            } catch (error) {
              console.error(error);
              onCopyError?.(
                error instanceof Error ? error : new Error("Copy failed"),
              );
            }

            // Cleanup
            URL.revokeObjectURL(blobURL);
          }, "image/png");
        };

        image.onerror = () => {
          onCopyError?.(new Error("Failed to load SVG image for copying."));
          console.error("Failed to load SVG image for copying.");
          URL.revokeObjectURL(blobURL);
        };

        setState("done");

        haptic("success");
        tiksSuccess();
      } catch (error) {
        setState("error");

        haptic("error");
        tiksError();

        onCopyError?.(
          error instanceof Error ? error : new Error("Copy failed"),
        );
      } finally {
        // Schedule reset to idle
        resetTimeoutRef.current = setTimeout(() => {
          setState("idle");
        }, resetDelay);
      }
    },
    [onCopySuccess, onCopyError, haptic, tiksSuccess, tiksError, resetDelay],
  );

  return { state, copy } as const;
}
