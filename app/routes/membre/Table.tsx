import { data, tableHeader } from "./tableData";
import AppText from "~/components/general/AppText/AppText";
import Badge from "~/components/common/badge/Badge";
import { cn } from "~/lib/utils";
import "./styles.css";
import { Pen, Trash2 } from "lucide-react";
import type { TableData } from "./type";
import type { LicensedResponse } from "~/services/userService";
import ImageProfile from "./ImageProfile";
import { useOutletContext } from "react-router";

interface Props {
  className?: string;
  onClickTrash?: (id: string | number) => void;
  onClickEdit?: (id: string | number, category: string) => void;
  tableHeader: typeof tableHeader;
  tableData: any[];
}

const Table = (props: Props) => {
  const { className, onClickTrash, onClickEdit, tableHeader, tableData } =
    props;

  const context = useOutletContext<{ role: string }>();

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
        {tableData.map((data, idx) => (
          <ul
            className="items-center list-item gap-2 min-w-[670px] rounded-[20px] bg-white p-4 shadow-sm hover:bg-gray-100"
            id={data._id}
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
                  <div className="flex items-center gap-3">
                    {head.key === "firstname" && (
                      <ImageProfile profile={data.profile} />
                    )}
                    <AppText size="sm">
                      {data[head.key as keyof typeof data]}
                    </AppText>
                  </div>
                )}
              </li>
            ))}
            <div className="flex gap-3 items-center">
              <Pen
                size={16}
                className="cursor-pointer justify-self-end"
                onClick={() => {
                  if (context.role === "SUPER_ADMIN") return;
                  if (onClickEdit) {
                    onClickEdit(data._id, data.category);
                  }
                }}
              />
              <Trash2
                size={16}
                color="red"
                className="cursor-pointer justify-self-end"
                onClick={() => {
                  if (context.role === "SUPER_ADMIN") return;

                  if (onClickTrash) {
                    onClickTrash(data._id);
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
