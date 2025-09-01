import React, { useEffect } from "react";
import { cn } from "~/lib/utils";
import { createPortal } from "react-dom";
import "./styles.css";
import { CrossIcon } from "lucide-react";
import CloseIcon from "~/components/icon/CloseIcon";

interface Props {
  children: React.ReactNode;
  className?: string;
  close?: boolean;
  setIsOpen: (value: boolean) => void;
}

function Dialog(props: Props) {
  const { className, children, close = false, setIsOpen } = props;

  useEffect(() => {
    window.scrollTo(0, +localStorage.getItem("scrollPosition")!);
  }, []);

  return createPortal(
    <div
      className={cn([
        close
          ? "flex fixed top-0 left-0 z-[1000] items-center justify-center w-full h-full"
          : "hidden",
      ])}
    >
      <div
        className="absolute top-0 left-0 z-[1100] w-screen h-screen bg-[#00000096]"
        onClick={() => setIsOpen(false)}
      ></div>
      <div
        className={cn(
          [className],
          "w-fit z-[1200] bg-white rounded-[20px] p-6"
        )}
      >
        <div
          className="absolute top-6 right-10 cursor-pointer"
          onClick={() => setIsOpen(false)}
        >
          <CloseIcon />
        </div>
        {children}
      </div>
    </div>,
    document.body
  );
}

export default Dialog;
