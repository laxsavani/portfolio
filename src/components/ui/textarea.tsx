import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[120px] w-full rounded-2xl border-t border-l border-white/10 border-b-4 border-r-2 border-black/40 bg-card/60 backdrop-blur-md px-4 py-3 text-base shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)] ring-offset-background placeholder:text-muted-foreground/50 transition-all duration-300 focus-visible:outline-none focus-visible:border-b-accent focus-visible:-translate-y-1 focus-visible:shadow-[0_10px_20px_hsl(var(--accent)/0.2)] disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
