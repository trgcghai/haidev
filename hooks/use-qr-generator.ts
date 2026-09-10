import { useRef, useState } from "react";
import { type ReactQRCodeRef } from "@lglab/react-qr-code";
import { format } from "date-fns";
import {
  DATA_MODULES_STYLES,
  FINDER_PATTERN_INNER_STYLES,
  FINDER_PATTERN_OUTER_STYLES,
} from "@/types/qr";
import { parseAsStringLiteral, useQueryStates } from "nuqs";

const useQrGenerator = () => {
  const refQr = useRef<ReactQRCodeRef>(null);
  const [value, setValue] = useState("");
  const [styles, setStyles] = useQueryStates(
    {
      dataModulesStyle:
        parseAsStringLiteral(DATA_MODULES_STYLES).withDefault("square"),
      finderPatternInnerStyle: parseAsStringLiteral(
        FINDER_PATTERN_INNER_STYLES,
      ).withDefault("square"),
      finderPatternOuterStyle: parseAsStringLiteral(
        FINDER_PATTERN_OUTER_STYLES,
      ).withDefault("square"),
    },
    {
      history: "replace",
    },
  );

  const download = () => {
    refQr.current?.download({
      name: "Haidev-QR-" + format(new Date(), "yyyy-MM-dd-HH-mm-ss"),
      format: "png",
      size: 1000,
    });
  };

  const random = () => {
    setStyles({
      dataModulesStyle:
        DATA_MODULES_STYLES[
          Math.floor(Math.random() * DATA_MODULES_STYLES.length)
        ],
      finderPatternInnerStyle:
        FINDER_PATTERN_INNER_STYLES[
          Math.floor(Math.random() * FINDER_PATTERN_INNER_STYLES.length)
        ],
      finderPatternOuterStyle:
        FINDER_PATTERN_OUTER_STYLES[
          Math.floor(Math.random() * FINDER_PATTERN_OUTER_STYLES.length)
        ],
    });
  };

  const restoreDefault = () => {
    setStyles({
      dataModulesStyle: "square",
      finderPatternInnerStyle: "square",
      finderPatternOuterStyle: "square",
    });
  };

  return {
    value,
    setValue,
    styles,
    setStyles,
    download,
    random,
    restoreDefault,
    refQr,
  };
};

export default useQrGenerator;
