import React, { useCallback, useState } from "react";
import { matchTableHeader, matchData, postTableHeader } from "./matchData";
import AppText from "~/components/general/AppText/AppText";
import "./styles.css";
import { Link, useNavigate, useOutletContext } from "react-router";
import type { MatchType } from "./type";
import { Trash2, X } from "lucide-react";
import { cn } from "~/lib/utils";
import { useUserStore, type UserStore } from "~/store/userStore";

type Post = {
  licensedId: string;
  name: string;
  firstname: string;
  lastname: string;
  _id: string;
};

export interface Props {
  headerData: typeof matchTableHeader;
  postHeaderData: typeof postTableHeader;
  bodyData: MatchType["matches"];
  tableTitle: string;
  handleNavigate: (path: string, query: string) => void;
  userConnected?: UserStore["user"];
  userConnecteRole?: string;
}

function Match(props: Props) {
  const {
    headerData,
    bodyData,
    tableTitle,
    handleNavigate,
    userConnected,
    userConnecteRole,
  } = props;
  return matchTable(
    headerData,
    bodyData,
    tableTitle,
    handleNavigate,
    userConnected,
    userConnecteRole
  );
}

function matchTable(
  headData: Props["headerData"],
  bodyData: Props["bodyData"],
  tableTitle: string,
  handleNavigate: (path: string, query: string) => void,
  userConnected?: UserStore["user"],
  userConnecteRole?: string
) {
  return (
    <div className="w-full bg-white p-6 rounded-2xl shadow-lg" key={tableTitle}>
      <AppText weight="semibold" size="lg">
        {tableTitle}
      </AppText>
      <table className="w-full mt-3">
        <thead>
          <tr>
            {headData.map((head, idx) => (
              <th key={`table-header-${idx}`} className="text-left">
                {head.label}
              </th>
            ))}
            {postTableHeader.map((post: any, idx: number) => (
              <th key={`post-${idx}`} className="text-left">
                {post.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {bodyData.map((data, idx) => (
            <tr
              key={idx + "-" + data.division}
              className={cn([
                "body-row",
                data.isAthome ? "" : "pointer-events-none opacity-50",
              ])}
              id={data._id}
            >
              {headData.map((head, idx) => (
                <td key={`table-row-${idx}`}>
                  <AppText size="xs" weight="normal">
                    {data[head.dataKey]}
                  </AppText>
                </td>
              ))}
              {postTableHeader.map(
                (
                  post: { label: string; dataKey: string; iconName: string },
                  idx: number
                ) => (
                  <td key={`post-${idx}`}>
                    {findPostCell(
                      post,
                      data.posts,
                      data._id,
                      handleNavigate,
                      userConnected,
                      userConnecteRole
                    )}
                  </td>
                )
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// find post in data
export function findPostCell(
  postHeaderData: Props["postHeaderData"][0],
  postsArray: Post[],
  matchId: string,
  handleNavigate: (path: string, query: string) => void,
  userConnected?: UserStore["user"],
  userConnecteRole?: string
): React.ReactNode {
  const post = postsArray.find((post) => post.name === postHeaderData.dataKey);
  let isAuthorizedDeleting: boolean = true;

  if (userConnecteRole === "LICENSED") {
    isAuthorizedDeleting = Boolean(post?.licensedId === userConnected?._id);
  }

  // get limit number of match from localstorage
  const limit = localStorage.getItem("limit") || "2";

  return post ? (
    <div className="flex gap-2 relative">
      <AppText size="sm" weight="normal">
        {`${post?.firstname} ${post?.lastname}`}
      </AppText>
      {isAuthorizedDeleting ? (
        <Trash2
          size={16}
          color="red"
          className="cursor-pointer"
          onClick={() => {
            handleNavigate("confirm-delete", `?id=${post._id}&limit=${limit}`);
          }}
        />
      ) : (
        <></>
      )}
    </div>
  ) : (
    <AppText
      className="text-red cursor-pointer"
      onClick={() => {
        if (userConnecteRole === "LICENSED") {
          handleNavigate(
            "assign-post",
            `?match=${matchId}&limit=${limit}&post=${postHeaderData.dataKey}&licensedId=${userConnected?._id}`
          );
        } else {
          handleNavigate(
            "assign-post",
            `?match=${matchId}&limit=${limit}&post=${postHeaderData.dataKey}`
          );
        }
      }}
    >
      Inscription
    </AppText>
  );
}
export default Match;
