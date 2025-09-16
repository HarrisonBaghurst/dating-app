import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "placeholder:text-foreground-second text-foreground-main p-[var(--padding-small)] paragraph-large bg-card-grey w-full rounded-[var(--rounding-small)]",
        "border-[3px] border-transparent",
        className
      )}
      {...props}
    />
  )
}

export { Input }
