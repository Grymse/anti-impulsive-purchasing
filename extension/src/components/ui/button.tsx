import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center text-lessforeground justify-center gap-2 whitespace-nowrap rounded-lessmd text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-lessring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-lessprimary text-lessprimary-foreground shadow hover:bg-lessprimary/90",
        destructive:
          "bg-lessdestructive text-lessdestructive-foreground shadow-sm hover:bg-lessdestructive/90",
        abort:
          "w-full bg-red-50 hover:bg-red-100 text-red-700 border-red-200 border shadow-sm",
        outline:
          "border border-lessinput bg-lessbackground shadow-sm hover:bg-lessaccent hover:text-lessaccent-foreground",
        secondary:
          "bg-lesssecondary text-lesssecondary-foreground shadow-sm hover:bg-lesssecondary/80",
        ghost: "hover:bg-lessmuted hover:text-lessaccent-foreground",
        link: "text-lessprimary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-lessmd px-3 text-xs",
        lg: "h-10 rounded-lessmd px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export interface CountdownButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean,
  countdown: number,
  onCountdownComplete?: () => void,
  resetOnClick?: boolean
}

const CountdownButton = React.forwardRef<HTMLButtonElement, CountdownButtonProps>(
  ({ className, variant, size, countdown, asChild = false, children, onCountdownComplete, resetOnClick = false, onClick, ...props }, ref) => {
    const [disabled, setDisabled] = React.useState(true);
    const [key, setKey] = React.useState(0); // Used to reset the animation

    React.useEffect(() => {
      const timeout = setTimeout(() => {
        setDisabled(false);
        if (onCountdownComplete) {
          onCountdownComplete();
        }
      }, countdown);
      return () => clearTimeout(timeout);
    }, [countdown, onCountdownComplete, key]);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (resetOnClick && !disabled) {
        setDisabled(true);
        setKey(prev => prev + 1);
      }
      
      if (onClick) {
        onClick(e);
      }
    };

    return (
      <Button
        className={cn(buttonVariants({ variant, size, className }), "relative overflow-hidden disabled:opacity-100")}
        ref={ref}
        onClick={handleClick}
        {...props}
        disabled={disabled}
      >
        {disabled && (
          <div
            key={key}
            style={{animationDuration: `${countdown}ms`}}
            className="absolute bg-white/70 h-full right-0 animation-loading" 
          />
        )}
        {children}
      </Button>
    )
  }
)

CountdownButton.displayName = "CountdownButton"

export { Button, CountdownButton, buttonVariants }
