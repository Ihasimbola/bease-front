import React from "react";
import { data, tableHeader } from "./tableData";
import AppText from "~/components/general/AppText/AppText";
import Badge from "~/components/common/badge/Badge";
import { cn } from "~/lib/utils";

interface Props {
  className?: string;
}

const Table = (props: Props) => {
  const { className } = props;

  return (
    <div className={cn(["overflow-x-auto max-w-screen", className])}>
      <div>
        <ul className="grid grid-cols-6 gap-2 min-w-[670px]">
          {tableHeader.map((head, idx) => (
            <li key={`header-${idx}`}>
              <AppText weight="semibold">{head.label}</AppText>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-4 mt-2">
        {data.map((data, idx) => (
          <ul
            className="grid items-center grid-cols-6 gap-2 min-w-[670px] rounded-[20px] bg-white p-4 shadow-sm"
            key={`licensed-${idx}`}
          >
            {tableHeader.map((head, idx) => (
              <li className="" key={`licensed-info-${idx}`}>
                {head.key === "isConfirmed" ? (
                  <Badge
                    color={
                      data[head.key as keyof typeof data] ? "green" : "red"
                    }
                  >
                    {data[head.key as keyof typeof data]
                      ? "Confirmé"
                      : "Non confirmé"}
                  </Badge>
                ) : (
                  <AppText size="sm">
                    {data[head.key as keyof typeof data]}
                  </AppText>
                )}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
};

export default Table;
