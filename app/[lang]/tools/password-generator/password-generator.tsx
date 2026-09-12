"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RefreshCw } from "lucide-react";
import { CopyButton } from "@/components/common/copy-button";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import { Dictionary } from "@/app/[lang]/dictionaries";

const LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
const UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const DIGITS = "0123456789";
const SPECIAL = "!@#$%^&*()_+-=[]{}|;:,.<>?";

interface PasswordGeneratorProps {
  title: string;
  description: string;
  dict: Dictionary["tools"]["password-generator"];
}

export default function PasswordGenerator({
  description,
  title,
  dict,
}: PasswordGeneratorProps) {
  const [length, setLength] = useState(12);
  const [includeDigit, setIncludeDigit] = useState(true);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeSpecial, setIncludeSpecial] = useState(true);
  const [password, setPassword] = useState("");

  const generatePassword = useCallback(() => {
    let characters = LOWERCASE;

    if (includeUppercase) characters += UPPERCASE;
    if (includeDigit) characters += DIGITS;
    if (includeSpecial) characters += SPECIAL;

    if (!characters || length <= 0) {
      setPassword("");
      return;
    }

    const array = new Uint32Array(length);
    crypto.getRandomValues(array);

    const generated = Array.from(
      array,
      (value) => characters[value % characters.length],
    ).join("");

    setPassword(generated);
  }, [length, includeDigit, includeUppercase, includeSpecial]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    generatePassword();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

      <div className="flex gap-2">
        <Input
          value={password}
          readOnly
          className="font-mono text-base! p-4!"
          aria-label="Generated password"
        />

        <Button
          size="icon-lg"
          onClick={generatePassword}
          variant="outline"
          aria-label="Regenerate password"
        >
          <RefreshCw />
        </Button>

        <CopyButton
          text={password}
          variant="default"
          size="icon-lg"
          onCopySuccess={() => toast.success(dict.passwordCopied)}
          onCopyError={() => toast.error(dict.failedToCopyPassword)}
        />
      </div>

      <div className="space-y-6 rounded-lg border p-6">
        <div className="space-y-2">
          <Label className="text-sm" htmlFor="length">
            {`${dict.passwordLength} ${length} ${dict.characters}`}
          </Label>
          <Slider
            value={length}
            step={1}
            max={128}
            min={8}
            onValueChange={(value) => setLength(value as number)}
          />
          <span className="text-sm text-muted-foreground">
            {dict.lengthHelp}
          </span>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Switch
              id="include-digit"
              checked={includeDigit}
              onCheckedChange={(checked) => setIncludeDigit(checked === true)}
            />
            <Label className="text-sm" htmlFor="include-digit">
              {dict.includeDigits}
            </Label>
          </div>

          <div className="flex items-center gap-3">
            <Switch
              id="include-uppercase"
              checked={includeUppercase}
              onCheckedChange={(checked) =>
                setIncludeUppercase(checked === true)
              }
            />
            <Label className="text-sm" htmlFor="include-uppercase">
              {dict.includeUppercase}
            </Label>
          </div>

          <div className="flex items-center gap-3">
            <Switch
              id="include-special"
              checked={includeSpecial}
              onCheckedChange={(checked) => setIncludeSpecial(checked === true)}
            />
            <Label className="text-sm" htmlFor="include-special">
              {dict.includeSpecial}
            </Label>
          </div>
        </div>
      </div>
    </main>
  );
}
