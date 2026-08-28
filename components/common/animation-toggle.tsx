"use client";

import { Button } from "@/components/ui/button";
import { Pause, Play } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function AnimationToggle() {
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    document.body.style.animationPlayState = isAnimating ? "running" : "paused";

    return () => {
      document.body.style.animationPlayState = "";
    };
  }, [isAnimating]);

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsAnimating((prev) => !prev)}
            aria-label="Toggle animation"
            className="text-xl"
          >
            {isAnimating ? <Pause /> : <Play />}
          </Button>
        }
      />
      <TooltipContent side="bottom">
        <p>
          {isAnimating
            ? "Pause the background animation"
            : "Play the background animation"}
        </p>
      </TooltipContent>
    </Tooltip>
  );
}
