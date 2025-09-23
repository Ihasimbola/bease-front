import React from "react";
import { findPostCell, type Props as MatchProps } from "./Match";
import AppText from "~/components/general/AppText/AppText";
import { Checkbox } from "@radix-ui/react-checkbox";
import Icon from "~/components/icon";
import { postTableHeader } from "./matchData";
import { cn } from "~/lib/utils";
import AppButton from "~/components/general/AppButton/AppButton";
import { Send } from "lucide-react";

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

  return (
    <div>
      <Checkbox />
      <AppText>Masquer les matchs exterieurs</AppText>
      <div className="mt-4 mb-1 flex justify-between items-center">
        <AppText weight="semibold">Matchs</AppText>
      </div>
      <div className="flex flex-col gap-6">
        {bodyData.map((data, idx) => (
          <ul key={`match-${idx}`} className={cn(["flex flex-col gap-1.5"])}>
            <li className={cn(["p-2 bg-gray2"])}>
              <AppText>{data.teamA}</AppText>
              <AppText>{data.teamB}</AppText>
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
