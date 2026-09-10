"use client";
import {
  DataModulesStyle,
  FinderPatternInnerStyle,
  FinderPatternOuterStyle,
  ReactQRCode,
} from "@lglab/react-qr-code";
import { Button } from "@/components/ui/button";
import { Download, Shuffle, Undo2Icon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DATA_MODULES_STYLES,
  FINDER_PATTERN_INNER_STYLES,
  FINDER_PATTERN_OUTER_STYLES,
} from "@/types/qr";
import { CopyQrButton } from "@/components/common/copy-button";
import useQrGenerator from "@/hooks/use-qr-generator";

interface QrCodeGeneratorProps {
  title: string;
  description: string;
}

const QrCodeGenerator = ({ title, description }: QrCodeGeneratorProps) => {
  const {
    value,
    setValue,
    styles,
    setStyles,
    download,
    random,
    restoreDefault,
    refQr,
  } = useQrGenerator();

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

      <div className="grid md:grid-cols-3 grid-cols-1 md:gap-8 gap-12">
        <div className="space-y-8 md:col-span-2">
          <Textarea
            value={value}
            onChange={(event) => setValue(event.target.value)}
            placeholder="Enter string"
            maxLength={2000}
          />

          <div className="space-y-4">
            <Label htmlFor="dataModulesStyle">Data Modules</Label>
            <Select
              id="dataModulesStyle"
              value={styles.dataModulesStyle}
              onValueChange={(value) =>
                setStyles({
                  ...styles,
                  dataModulesStyle: value as DataModulesStyle,
                })
              }
            >
              <SelectTrigger className="w-full capitalize">
                <SelectValue placeholder="Select a style" />
              </SelectTrigger>
              <SelectContent>
                {DATA_MODULES_STYLES.map((s) => (
                  <SelectItem key={s} value={s} className="capitalize">
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <Label htmlFor="finderPatternInnerStyle">
              Finder Pattern (Inner)
            </Label>
            <Select
              id="finderPatternInnerStyle"
              value={styles.finderPatternInnerStyle}
              onValueChange={(value) =>
                setStyles({
                  ...styles,
                  finderPatternInnerStyle: value as FinderPatternInnerStyle,
                })
              }
            >
              <SelectTrigger className="w-full capitalize">
                <SelectValue placeholder="Select a style" />
              </SelectTrigger>
              <SelectContent>
                {FINDER_PATTERN_INNER_STYLES.map((s) => (
                  <SelectItem key={s} value={s} className="capitalize">
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <Label htmlFor="finderPatternOuterStyle">
              Finder Pattern (Outer)
            </Label>
            <Select
              id="finderPatternOuterStyle"
              value={styles.finderPatternOuterStyle}
              onValueChange={(value) =>
                setStyles({
                  ...styles,
                  finderPatternOuterStyle: value as FinderPatternOuterStyle,
                })
              }
            >
              <SelectTrigger className="w-full capitalize">
                <SelectValue placeholder="Select a style" />
              </SelectTrigger>
              <SelectContent>
                {FINDER_PATTERN_OUTER_STYLES.map((s) => (
                  <SelectItem key={s} value={s} className="capitalize">
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-4">
            <Button onClick={random}>
              <Shuffle className="size-4" />
              Random
            </Button>
            <Button variant="secondary" onClick={restoreDefault}>
              <Undo2Icon className="size-4" />
              Restore
            </Button>
          </div>
        </div>

        <div className="col-span-1 flex flex-col items-center justify-center gap-8">
          <div className="rounded-lg h-fit w-fit overflow-hidden">
            <ReactQRCode
              background="#fff"
              marginSize={2}
              ref={refQr}
              size={256}
              value={value}
              dataModulesSettings={{ style: styles.dataModulesStyle }}
              finderPatternInnerSettings={{
                style: styles.finderPatternInnerStyle,
              }}
              finderPatternOuterSettings={{
                style: styles.finderPatternOuterStyle,
              }}
            />
          </div>
          <div className="flex flex-col items-center justify-center w-3xs gap-4">
            <Button onClick={download} className="w-full">
              <Download className="size-4" />
              Download
            </Button>
            <CopyQrButton
              // eslint-disable-next-line react-hooks/refs
              data={refQr.current?.svg as SVGSVGElement}
              className="w-full"
            >
              <p className="ml-2">Copy</p>
            </CopyQrButton>
          </div>
        </div>
      </div>
    </main>
  );
};

export default QrCodeGenerator;
