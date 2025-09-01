import React from "react";
import { findPostCell, type Props as MatchProps } from "./Match";
import AppText from "~/components/general/AppText/AppText";
import { Checkbox } from "@radix-ui/react-checkbox";
import Icon from "~/components/icon";
import { postTableHeader } from "./matchData";
import { cn } from "~/lib/utils";
import AppButton from "~/components/general/AppButton/AppButton";

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
        {userConnecteRole !== "LICENSED" && (
          <AppButton
            variant="primary"
            onClick={() => {
              handleNavigate(
                "confirm-delete-match",
                `?match=${bodyData[0]._id}&limit=${limit}`
              );
            }}
          >
            Supprimer le match
          </AppButton>
        )}
      </div>
      <div className="flex flex-col gap-6">
        {bodyData.map((data, idx) => (
          <ul
            key={`match-${idx}`}
            className={cn([
              data.isAthome ? "" : "pointer-events-none opacity-50",
              "flex flex-col gap-1.5",
            ])}
          >
            <li className={cn(["p-2 bg-gray2"])}>
              <AppText>{data.teamA}</AppText>
              <AppText>{data.teamB}</AppText>
            </li>
            {headerData.map((head, idx) => {
              if (head.dataKey === "message") {
                return "";
              }

              return (
                <li key={`match-${idx}`} className="flex justify-between">
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
              ) => (
                <li key={`match-${idx}`} className="flex justify-between">
                  <AppText>{post.label}</AppText>
                  {findPostCell(
                    post,
                    data.posts,
                    data._id,
                    handleNavigate,
                    userConnected,
                    userConnecteRole
                  )}
                </li>
              )
            )}
          </ul>
        ))}
      </div>
    </div>
  );
}

export default MatchAccordionContent;
