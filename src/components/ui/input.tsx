import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-12 w-full rounded-2xl border-t border-l border-white/10 border-b-4 border-r-2 border-black/40 bg-card/60 backdrop-blur-md px-4 py-2 text-base shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)] ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground/50 transition-all duration-300 focus-visible:outline-none focus-visible:border-b-accent focus-visible:-translate-y-1 focus-visible:shadow-[0_10px_20px_hsl(var(--accent)/0.2)] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
