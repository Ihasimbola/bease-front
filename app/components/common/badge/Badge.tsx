import { cva, type VariantProps } from "class-variance-authority";
import React from "react";
import AppText from "~/components/general/AppText/AppText";
import { cn } from "~/lib/utils";

export const badgeVariants = cva(
  "p-2 rounded cursor-pointer text-xs font-regular w-fit",
  {
    variants: {
      color: {
        green: "bg-green-100 text-green-900",
        red: "bg-red-100 text-red-900",
      },
    },
  }
);

interface BadgeProps extends VariantProps<typeof badgeVariants> {
  children: React.ReactNode;
}

function Badge({ children, color }: BadgeProps) {
  return <div className={cn([badgeVariants({ color })])}>{children}</div>;
}

export default Badge;
