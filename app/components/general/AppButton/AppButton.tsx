import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "~/libs/twMerge";

export const buttonVariantProps = cva(
  "flex items-center justify-center gap-2 rounded-[30px] text-white font-semibold hover:brightness-110 active:brightness-90 cursor-pointer transition duration-300 ease-in-out py-[10px] px-[20px]",
  {
    variants: {
      variant: {
        primary: "bg-red text-white",
        outlined: "bg-transparent border border-gray text-white",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
);

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariantProps>;

export default function AppButton({
  className,
  variant,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn([buttonVariantProps({ variant }), className])}
      {...props}
    />
  );
}
