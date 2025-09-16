import * as React from "react"

import { cn } from "@/lib/classUtils"

function Input({ className, type, title, ...props }: React.ComponentProps<"input">) {
    return (
		<div className="flex flex-col gap-[calc(var(--gap-small)/3)] w-full">
			<p className="paragraph-small text-foreground-second">
				{title}
			</p>
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
		</div>
    )
}

export { Input }
