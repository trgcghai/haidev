"use client";

import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type ComparisonResult = {
  index: number;
  first: string;
  second: string;
  same: boolean;
};

interface StringComparatorProps {
  title: string;
  description: string;
}

export default function StringComparator({
  title,
  description,
}: StringComparatorProps) {
  const [firstString, setFirstString] = useState("");
  const [secondString, setSecondString] = useState("");

  const results = useMemo<ComparisonResult[]>(() => {
    const maxLength = Math.max(firstString.length, secondString.length);

    return Array.from({ length: maxLength }, (_, index) => {
      const first = firstString[index] ?? "";
      const second = secondString[index] ?? "";

      return {
        index,
        first,
        second,
        same: first === second,
      };
    });
  }, [firstString, secondString]);

  const sameCount = results.filter((result) => result.same).length;
  const differenceCount = results.length - sameCount;

  const clear = () => {
    setFirstString("");
    setSecondString("");
  };

  return (
    <main className="flex w-full flex-col gap-4">
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
          <Label htmlFor="first-string">First string</Label>
          <Input
            id="first-string"
            value={firstString}
            onChange={(event) => setFirstString(event.target.value)}
            placeholder="Enter first string"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="second-string">Second string</Label>
          <Input
            id="second-string"
            value={secondString}
            onChange={(event) => setSecondString(event.target.value)}
            placeholder="Enter second string"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Badge variant="outline">Same: {sameCount}</Badge>

        <Badge variant="destructive">Difference: {differenceCount}</Badge>

        <Button variant="outline" className="ml-auto" onClick={clear}>
          Clear
        </Button>
      </div>

      <Card className="">
        <CardHeader>
          <CardTitle>Comparison</CardTitle>
        </CardHeader>

        <CardContent>
          {results.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Enter two strings to compare them.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <div className="min-w-max font-mono text-lg">
                <div className="mb-2 flex">
                  {results.map((result) => (
                    <div
                      key={result.index}
                      className="w-6 text-center text-xs text-muted-foreground"
                    >
                      {result.index}
                    </div>
                  ))}
                </div>

                <div className="flex">
                  {results.map((result) => (
                    <div
                      key={`first-${result.index}`}
                      className={`flex h-8 w-6 items-center justify-center ${
                        result.same
                          ? "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400"
                          : "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400"
                      }`}
                    >
                      {result.first || "·"}
                    </div>
                  ))}
                </div>

                <div className="mt-1 flex">
                  {results.map((result) => (
                    <div
                      key={`second-${result.index}`}
                      className={`flex h-8 w-6 items-center justify-center ${
                        result.same
                          ? "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400"
                          : "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400"
                      }`}
                    >
                      {result.second || "·"}
                    </div>
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
