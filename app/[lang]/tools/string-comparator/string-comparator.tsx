"use client";

import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Dictionary } from "@/app/[lang]/dictionaries";

type ComparisonResult = {
  index: number;
  first: string;
  second: string;
  same: boolean;
};

interface StringComparatorProps {
  title: string;
  description: string;
  dict: Dictionary["tools"]["string-comparator"];
}

export default function StringComparator({
  title,
  description,
  dict,
}: StringComparatorProps) {
  const [firstString, setFirstString] = useState("");
  const [secondString, setSecondString] = useState("");
  const [trimWhitespace, setTrimWhitespace] = useState(false);

  const results = useMemo<ComparisonResult[]>(() => {
    let firstStringToCompare = firstString;
    let secondStringToCompare = secondString;

    if (trimWhitespace) {
      firstStringToCompare = firstStringToCompare.trim();
      secondStringToCompare = secondStringToCompare.trim();
    }

    const maxLength = Math.max(
      firstStringToCompare.length,
      secondStringToCompare.length,
    );

    return Array.from({ length: maxLength }, (_, index) => {
      const first = firstStringToCompare[index] ?? "";
      const second = secondStringToCompare[index] ?? "";

      return {
        index,
        first,
        second,
        same: first === second,
      };
    });
  }, [firstString, secondString, trimWhitespace]);

  const sameCount = results.filter((result) => result.same).length;
  const differenceCount = results.length - sameCount;

  const clear = () => {
    setFirstString("");
    setSecondString("");
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

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="first-string">{dict.firstString}</Label>
            <span className="text-xs text-muted-foreground">
              {trimWhitespace ? firstString.trim().length : firstString.length}
              /2000
            </span>
          </div>
          <Input
            id="first-string"
            value={firstString}
            onChange={(event) => setFirstString(event.target.value)}
            placeholder={dict.firstStringPlaceholder}
            maxLength={2000}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="second-string">{dict.secondString}</Label>
            <span className="text-xs text-muted-foreground">
              {trimWhitespace
                ? secondString.trim().length
                : secondString.length}
              /2000
            </span>
          </div>
          <Input
            id="second-string"
            value={secondString}
            onChange={(event) => setSecondString(event.target.value)}
            placeholder={dict.secondStringPlaceholder}
            maxLength={2000}
          />
        </div>
      </div>

      <div>
        <div className="flex items-center gap-3">
          <Switch
            id="trim-whitespace"
            checked={trimWhitespace}
            onCheckedChange={(checked) => setTrimWhitespace(checked === true)}
          />
          <Label className="text-sm" htmlFor="trim-whitespace">
            {dict.trimWhitespace}
          </Label>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Badge variant="outline">
          {dict.same} {sameCount}
        </Badge>

        <Badge variant="destructive">
          {dict.difference} {differenceCount}
        </Badge>

        <Button variant="outline" className="ml-auto" onClick={clear}>
          {dict.clear}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{dict.comparison}</CardTitle>
        </CardHeader>

        <CardContent>
          {results.length === 0 ? (
            <p className="text-sm text-muted-foreground">{dict.emptyState}</p>
          ) : (
            <div className="overflow-x-auto">
              <div className="min-w-max font-mono text-lg">
                <div className="flex">
                  {results.map((result) => (
                    <Tooltip key={`second-${result.index}`}>
                      <TooltipTrigger>
                        <div
                          className={cn(
                            "flex h-8 w-6 items-center justify-center",
                            result.same &&
                              "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400",
                            !result.same &&
                              "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400",
                          )}
                        >
                          {result.second || "·"}
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="top">
                        <p>
                          {dict.index}: {result.index}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </div>

                <div className="mt-1 flex">
                  {results.map((result) => (
                    <Tooltip key={`first-${result.index}`}>
                      <TooltipTrigger>
                        <div
                          className={cn(
                            "flex h-8 w-6 items-center justify-center",
                            result.same &&
                              "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400",
                            !result.same &&
                              "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400",
                          )}
                        >
                          {result.first || "·"}
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="bottom">
                        <p>
                          {dict.index}: {result.index}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
