import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-lessmd border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-lessring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-lessprimary text-lessprimary-foreground shadow hover:bg-lessprimary/80",
        secondary:
          "border-transparent bg-lesssecondary text-lesssecondary-foreground hover:bg-lesssecondary/80",
        destructive:
          "border-transparent bg-lessdestructive text-lessdestructive-foreground shadow hover:bg-lessdestructive/80",
        outline: "text-lessforeground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
