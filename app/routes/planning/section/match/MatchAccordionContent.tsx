import { useContext, useEffect, useState } from "react";
import { findPostCell, type Props as MatchProps } from "./Match";
import AppText from "~/components/general/AppText/AppText";
import Icon from "~/components/icon";
import { postTableHeader } from "./matchData";
import { cn } from "~/lib/utils";
import AppButton from "~/components/general/AppButton/AppButton";
import { Send } from "lucide-react";
import { Checkbox } from "~/components/ui/checkbox";
import { handleDeleteSelect } from "./handeDeleteSelect";
import { SelectAllContext } from "~/hooks/useSelectedAllContext";

function MatchAccordionContent(props: MatchProps) {
  const {
    headerData,
    bodyData,
    tableTitle,
    postHeaderData,
    handleNavigate,
    userConnected,
    userConnecteRole,
  } = props;

  // get limit number of match from localstorage
  const limit = localStorage.getItem("limit") || "2";

  const [allMatchSelectState, setAllMatchSelectState] = useState(
    bodyData.map((match) => ({
      id: match._id,
      checked: false,
    }))
  );

  const selectAllMatchContext = useContext(SelectAllContext);

  useEffect(() => {
    if (selectAllMatchContext) {
      setAllMatchSelectState(
        bodyData.map((match) => ({
          id: match._id,
          checked: true,
        }))
      );
    } else {
      setAllMatchSelectState(
        bodyData.map((match) => ({
          id: match._id,
          checked: false,
        }))
      );
    }
  }, [selectAllMatchContext]);

  const handleChangeSelect = (e: boolean, matchId: string) => {
    setAllMatchSelectState((prev) => {
      return prev.map((match, idx) => {
        if (match.id === matchId) {
          return {
            id: match.id,
            checked: e,
          };
        } else {
          return {
            id: match.id,
            checked: prev[idx].checked,
          };
        }
      });
    });

    // update value in localstorage
    handleDeleteSelect(matchId, e);
  };

  return (
    <div>
      <div className="mt-4 mb-1 flex justify-between items-center">
        <AppText weight="semibold">Matchs</AppText>
      </div>
      <div className="flex flex-col gap-6">
        {bodyData.map((data, idx) => (
          <ul key={`match-${idx}`} className={cn(["flex flex-col gap-1.5"])}>
            <li
              className={cn(["flex justify-between items-center p-2 bg-gray2"])}
            >
              <div>
                <AppText>{data.teamA}</AppText>
                <AppText>{data.teamB}</AppText>
              </div>
              <div className="flex gap-2 items-center justify-end">
                <Checkbox
                  id={`delete-${data._id}`}
                  onCheckedChange={(e) => {
                    handleChangeSelect(Boolean(e), data._id);
                  }}
                  checked={allMatchSelectState[idx].checked}
                />
                <label htmlFor={`delete-${data._id}`}>
                  <AppText weight="semibold" size="xs">
                    Supprimer
                  </AppText>
                </label>
              </div>
            </li>
            {headerData.map((head, idx) => {
              if (head.dataKey === "message" && userConnecteRole === "ADMIN") {
                return (
                  <li
                    key={`match-${idx}`}
                    className={cn([
                      "flex justify-between",
                      data.isAthome ? "" : "opacity-50 pointer-events-none",
                    ])}
                    id={data._id}
                  >
                    <AppText>Message</AppText>
                    <Send
                      size={24}
                      id={data._id}
                      color="brown"
                      className="cursor-pointer"
                      onClick={() =>
                        handleNavigate(
                          "assign-invitation",
                          `?match=${data._id}`
                        )
                      }
                    />
                  </li>
                );
              }

              return (
                <li
                  key={`match-${idx}`}
                  className={cn([
                    data.isAthome ? "" : "opacity-50",
                    "flex justify-between",
                  ])}
                >
                  <div className="match-info">
                    <div className="self-center justify-self-center">
                      <Icon name={head.iconName} />
                    </div>
                    <AppText weight="semibold" color="gray">
                      {head.label}
                    </AppText>
                  </div>
                  <AppText weight="light" size="sm">
                    {data[head.dataKey as keyof typeof data]}
                  </AppText>
                </li>
              );
            })}

            {postTableHeader.map(
              (
                post: { label: string; dataKey: string; iconName: string },
                idx: number
              ) => {
                return (
                  <li
                    key={`match-${idx}`}
                    className={cn([
                      data.isAthome ? "" : "opacity-50",
                      "flex justify-between",
                    ])}
                  >
                    <AppText>{post.label}</AppText>
                    {findPostCell(
                      post,
                      data.posts,
                      data._id,
                      handleNavigate,
                      data.isAthome,
                      userConnected,
                      userConnecteRole
                    )}
                  </li>
                );
              }
            )}
            {userConnecteRole !== "LICENSED" && (
              <li className="flex gap-4">
                <AppButton
                  variant="primary"
                  onClick={() => {
                    if (userConnecteRole === "SUPER_ADMIN") {
                      return;
                    }

                    return handleNavigate(
                      "confirm-delete-match",
                      `?match=${data._id}&limit=${limit}`
                    );
                  }}
                >
                  Supprimer le match
                </AppButton>
                <AppButton
                  variant="outlined"
                  onClick={() => {
                    if (userConnecteRole === "SUPER_ADMIN") {
                      return;
                    }
                    return handleNavigate("create-match", `?match=${data._id}`);
                  }}
                >
                  Editer le match
                </AppButton>
              </li>
            )}
          </ul>
        ))}
      </div>
    </div>
  );
}

export default MatchAccordionContent;
