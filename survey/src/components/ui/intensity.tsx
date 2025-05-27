import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn, lightenColor } from "@/lib/utils";
const Intensity = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
    color: string;
  }
>(({ className, value, color, ...props }, ref) => {
  const isDarkmode = document.documentElement.classList.contains("dark");

  const gradient = `linear-gradient(to right, ${lightenColor(
    color,
    isDarkmode ? -100 : -30
  )} 0%, ${color} 50%, ${lightenColor(color, 100)} 100%)`;
  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-full",
        className
      )}
      style={{
        background: gradient,
      }}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className="h-full w-full flex-1 bg-background/80 transition-all"
        style={{ transform: `translateX(${value || 0}%)` }}
      />
    </ProgressPrimitive.Root>
  );
});
Intensity.displayName = "Intensity";

export { Intensity };
