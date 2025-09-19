import React from "react";

type Props = {};

function Squeleton({}: Props) {
  return (
    <>
      <div className="flex flex-col gap-5 min-w-[320px] items-center cursor-pointer animate-pulse">
        <div className="flex self-start w-full items-center gap-3 ">
          <div className="w-[40px] h-[40px] rounded-[50%] bg-gray1"></div>
          <div className="h-[20px] flex-[0.5] rounded-[10px] bg-gray1"></div>
        </div>
        <div className="w-[250px] h-[250px] bg-gray1"></div>
        <div className="h-[20px] w-[150px] rounded-[10px] bg-gray1"></div>
      </div>
    </>
  );
}

export default Squeleton;
