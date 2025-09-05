import { cva, type VariantProps } from "class-variance-authority";
import { useEffect, useLayoutEffect, useRef } from "react";
import { cn } from "~/libs/twMerge";

export const buttonVariantProps = cva(
  "flex items-center justify-center gap-2 rounded-[30px] text-white text-xs font-semibold hover:brightness-110 active:brightness-90 cursor-pointer transition duration-300 ease-in-out py-[10px] px-[20px]",
  {
    variants: {
      variant: {
        primary: "bg-red text-white",
        outlined:
          "bg-transparent border border-gray text-white hover:bg-black hover:text-white text-black active:bg-black active:text-white",
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
  const ref = useRef<HTMLButtonElement>(null);

  // experimental
  // prevent button width to change when loading
  useLayoutEffect(() => {
    if (ref.current?.offsetWidth) {
      const width = +ref.current.offsetWidth + 1;
      ref.current.style.width = `${width}px`;
    }
  }, [props.children]);

  return (
    <button
      ref={ref}
      className={cn([buttonVariantProps({ variant }), className])}
      {...props}
    />
  );
}
