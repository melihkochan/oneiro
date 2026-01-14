import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        // Premium Mystical Variants
        mystical: 
          "relative bg-gradient-to-r from-[hsl(45_80%_55%)] via-[hsl(45_85%_62%)] to-[hsl(45_90%_70%)] text-[hsl(232_40%_6%)] font-semibold shadow-[0_0_20px_hsl(45_80%_55%/0.4)] hover:shadow-[0_0_35px_hsl(45_80%_55%/0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300",
        cosmic:
          "relative bg-gradient-to-r from-secondary to-accent text-foreground border border-[hsl(45_80%_55%/0.3)] shadow-lg hover:border-[hsl(45_80%_55%/0.5)] hover:shadow-[0_0_20px_hsl(260_60%_40%/0.4)]",
        record:
          "relative bg-gradient-to-br from-red-600 to-red-700 text-foreground border-2 border-red-500/50 shadow-[0_0_30px_hsl(0_80%_50%/0.4)] hover:shadow-[0_0_50px_hsl(0_80%_50%/0.6)] hover:scale-105 active:scale-95",
        glass:
          "bg-[hsl(232_35%_10%/0.4)] backdrop-blur-md border border-[hsl(232_30%_18%/0.5)] text-foreground hover:bg-[hsl(232_35%_10%/0.6)] hover:border-[hsl(45_80%_55%/0.3)]",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-lg px-8",
        xl: "h-14 rounded-xl px-10 text-base",
        icon: "h-10 w-10",
        "icon-lg": "h-16 w-16 rounded-full",
        "icon-xl": "h-24 w-24 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
