import { data, tableHeader } from "./tableData";
import AppText from "~/components/general/AppText/AppText";
import Badge from "~/components/common/badge/Badge";
import { cn } from "~/lib/utils";
import "./styles.css";
import { Pen, Trash2 } from "lucide-react";
import type { TableData } from "./type";

interface Props {
  className?: string;
  onClickTrash?: (id: string | number) => void;
  onClickEdit?: (id: string | number, category: string) => void;
  tableHeader: typeof tableHeader;
  tableData: TableData[] | never[];
}

const Table = (props: Props) => {
  const { className, onClickTrash, onClickEdit, tableHeader, tableData } =
    props;

  return (
    <div
      className={cn([
        "overflow-x-auto max-w-screen bg-white p-5 rounded-[20px]",
        className,
      ])}
    >
      <div className="border-b pb-2">
        <ul className=" head gap-2 min-w-[670px]">
          {tableHeader.map((head, idx) => (
            <li key={`header-${idx}`}>
              <AppText weight="semibold">{head.label}</AppText>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-4 mt-2">
        {tableData.map((tableData, idx) => (
          <ul
            className="items-center list-item gap-2 min-w-[670px] rounded-[20px] bg-white p-4 shadow-sm hover:bg-gray-100"
            id={tableData._id}
            key={`licensed-${idx}`}
          >
            {tableHeader.map((head, idx) => (
              <li className="" key={`licensed-info-${idx}`}>
                {head.key === "isConfirmed" ? (
                  <Badge
                    color={
                      tableData[head.key as keyof typeof tableData]
                        ? "green"
                        : "red"
                    }
                  >
                    {tableData[head.key as keyof typeof tableData]
                      ? "Confirmé"
                      : "Non confirmé"}
                  </Badge>
                ) : (
                  <AppText size="sm">
                    {tableData[head.key as keyof typeof tableData]}
                  </AppText>
                )}
              </li>
            ))}
            <div className="flex gap-3 items-center">
              <Pen
                size={16}
                className="cursor-pointer justify-self-end"
                onClick={() => {
                  if (onClickEdit) {
                    onClickEdit(tableData._id, tableData.category);
                  }
                }}
              />
              <Trash2
                size={16}
                color="red"
                className="cursor-pointer justify-self-end"
                onClick={() => {
                  if (onClickTrash) {
                    onClickTrash(tableData._id);
                  }
                  return;
                }}
              />
            </div>
          </ul>
        ))}
      </div>
    </div>
  );
};

export default Table;
