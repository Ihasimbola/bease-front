import AppText from "~/components/general/AppText/AppText";
import {
  Select,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectValue,
} from "~/components/ui/select";
import { cn } from "~/lib/utils";
import { monthArgs } from "../../data/filterData";
import { Input } from "~/components/ui/input";
import AppButton from "~/components/general/AppButton/AppButton";
import { Check } from "lucide-react";

interface Props {
  filterData: {
    id: number;
    label: string;
    active: boolean;
    mode: string;
    args?: string | number;
  }[];
  yearFilter: string;
  handleChangeYearFilter: (value: string) => void;
  handleToggleActiveFilter: (id: string | number) => void;
  handleChangeSelectMonth: (id: number) => void;
  activeFilter?: string;
  bubbleLimit?: string;
  handleChangeBubbleLimit: (value: string) => void;
}

function MatchFilters({
  filterData,
  handleToggleActiveFilter,
  handleChangeSelectMonth,
  handleChangeYearFilter,
  yearFilter,
  activeFilter,
  bubbleLimit,
  handleChangeBubbleLimit,
}: Props) {
  return (
    <section className="mt-8">
      <AppText weight="bold">Filtrer par:</AppText>
      <ul className="flex flex-col gap-4 lg:flex-row">
        {filterData.map((filter) => (
          <li key={`filter-${filter.id}`}>
            <FilterItem
              active={filter.active}
              label={filter.label}
              id={filter.id}
              handleClick={handleToggleActiveFilter}
            />

            {/****************** IF FILTER IS BUBBLE **************************/}
            {filter.mode === "bubble" && (
              <div className="flex items-center gap-2 mt-1">
                {activeFilter === "bubble" && (
                  <>
                    {/* <AppText size="xs" color="gray">
                      Dans
                    </AppText>
                    <Input
                      type="number"
                      id={filter.id.toString()}
                      className="w-[80px]"
                      value={bubbleLimit}
                      min={1}
                      onChange={(e) => handleChangeBubbleLimit(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleToggleActiveFilter(e.currentTarget.id);
                        }
                      }}
                    />
                    <AppText size="xs" color="gray">
                      Jours
                    </AppText>
                    <button
                      className="bg-black cursor-pointer rounded-[8px] h-fit py-2 px-2"
                      type="button"
                      id={filter.id.toString()}
                      onClick={(e) =>
                        handleToggleActiveFilter(e.currentTarget.id)
                      }
                    >
                      <Check size={18} className="stroke-white" />
                    </button> */}
                  </>
                )}
              </div>
            )}

            {/***************** IF FILTER IS BY MONTH **************************/}
            {filter.mode === "byMonth" && (
              <div className="flex gap-2 mt-1">
                {activeFilter === "byMonth" && (
                  <>
                    <Select onValueChange={(e) => handleChangeSelectMonth(+e)}>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={
                            monthArgs.find(
                              (month) =>
                                month.monthIdx === new Date().getMonth() + 1
                            )?.monthName
                          }
                          defaultValue={
                            monthArgs.find(
                              (month) =>
                                month.monthIdx === new Date().getMonth() + 1
                            )?.monthIdx
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup className="bg-white">
                          {monthArgs.map((month, idx) => (
                            <SelectItem
                              key={`month-${idx}`}
                              value={month.monthIdx.toString()}
                            >
                              {month.monthName}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <Input
                      defaultValue={new Date().getFullYear()}
                      value={yearFilter}
                      onChange={(e) => handleChangeYearFilter(e.target.value)}
                      onKeyDown={(e) => {
                        // if user press enter key then submit
                        if (e.key === "Enter") {
                          handleToggleActiveFilter(
                            filterData.find(
                              (filter) => filter.mode === "byMonth"
                            )!.id
                          );
                        }
                      }}
                      className="w-fit"
                    />
                    <button
                      className="bg-black cursor-pointer rounded-[8px] h-fit py-2 px-2"
                      type="button"
                      onClick={() =>
                        handleToggleActiveFilter(
                          filterData.find(
                            (filter) => filter.mode === "byMonth"
                          )!.id
                        )
                      }
                    >
                      <Check size={18} className="stroke-white" />
                    </button>
                  </>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

function FilterItem(props: {
  id: number;
  label: string;
  active: boolean;
  handleClick: (id: string | number) => void;
}) {
  const { id, label, active, handleClick } = props;

  return (
    <div
      className={cn([
        "py-[10px] px-[20px] cursor-pointer hover:bg-black hover:text-white transition-all duration-300 rounded-[30px] border border-gray w-fit",
        active && "bg-black text-white",
      ])}
      id={id.toString()}
      onClick={(e) => handleClick(e.currentTarget.id)}
    >
      <p className="font-normal text-xs">{label}</p>
    </div>
  );
}

export default MatchFilters;
