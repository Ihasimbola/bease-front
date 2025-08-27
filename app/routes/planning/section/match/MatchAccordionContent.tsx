import React from "react";
import { findPostCell, type Props as MatchProps } from "./Match";
import AppText from "~/components/general/AppText/AppText";
import { Checkbox } from "@radix-ui/react-checkbox";
import Icon from "~/components/icon";
import { postTableHeader } from "./matchData";

function MatchAccordionContent(props: MatchProps) {
  const { headerData, bodyData, tableTitle, postHeaderData } = props;
  return (
    <div>
      <Checkbox />
      <AppText>Masquer les matchs exterieurs</AppText>
      <div className="mt-4 mb-1">
        <AppText weight="semibold">Matchs</AppText>
      </div>
      <div className="flex flex-col gap-6">
        {bodyData.map((data, idx) => (
          <ul key={`match-${idx}`} className="flex flex-col gap-1.5">
            <li className="p-2 bg-gray2">
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
                  {findPostCell(post, data.posts, data._id)}
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
