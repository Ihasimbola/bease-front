import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "~/libs/twMerge";

export const textVariantsProps = cva("", {
  variants: {
    color: {
      black: "text-black",
      white: "text-white",
      red: "text-red",
      gray: "text-gray",
      gray1: "text-gray-100",
      gray2: "text-gray-200",
      grayblue: "text-grayblue-600",
    },
    size: {
      xs: "text-xs",
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
      xl: "text-xl",
      "2xl": "text-2xl",
    },
    weight: {
      thin: "font-thin",
      light: "font-light",
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },
  },
  defaultVariants: {
    color: "black",
    size: "md",
    weight: "normal",
  },
});

type TextProps = ComponentProps<keyof HTMLElementTagNameMap> &
  VariantProps<typeof textVariantsProps> & {
    as?: keyof HTMLElementTagNameMap;
  };

export default function AppText({
  className,
  size,
  color,
  weight,
  ...props
}: TextProps) {
  const { as = "p" } = props;
  const Tag = as;

  return (
    <Tag
      className={cn([textVariantsProps({ size, color, weight }), className])}
      {...props}
    />
  );
}
