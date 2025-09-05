import React, { useCallback, useState } from "react";
import { matchTableHeader, matchData, postTableHeader } from "./matchData";
import AppText from "~/components/general/AppText/AppText";
import "./styles.css";
import { Form, Link, useNavigate, useOutletContext } from "react-router";
import type { MatchType } from "./type";
import { Pen, Send, SendHorizonalIcon, Trash2, X } from "lucide-react";
import { cn } from "~/lib/utils";
import { useUserStore, type UserStore } from "~/store/userStore";
import AppButton from "~/components/general/AppButton/AppButton";

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
  // get limit number of match from localstorage
  const limit = localStorage.getItem("limit") || "2";

  return (
    <div className="w-full bg-white p-6 rounded-2xl shadow-lg" key={tableTitle}>
      <div className="flex justify-between items-center">
        <AppText weight="semibold" size="lg">
          {tableTitle}
        </AppText>
      </div>
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
              className={cn(["body-row", data.isAthome ? "" : "opacity-50"])}
              id={data._id}
            >
              {headData.map((head, idx) => {
                if (
                  head.dataKey === "message" &&
                  userConnecteRole !== "LICENSED"
                ) {
                  return (
                    <td
                      key={`table-row-${idx}`}
                      className={cn([
                        "pt-1 pl-2 cursor-pointer",
                        !data.isAthome && "pointer-events-none",
                      ])}
                      id={data._id}
                      onClick={() =>
                        handleNavigate(
                          "assign-invitation",
                          `?match=${data._id}`
                        )
                      }
                    >
                      <Send size={24} color="brown" />
                    </td>
                  );
                }
                return (
                  <td key={`table-row-${idx}`}>
                    <AppText size="xs" weight="normal">
                      {data[head.dataKey]}
                    </AppText>
                  </td>
                );
              })}
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
                      data.isAthome,
                      userConnected,
                      userConnecteRole
                    )}
                  </td>
                )
              )}
              {userConnecteRole !== "LICENSED" && (
                <td>
                  <Pen
                    color="black"
                    size={16}
                    className="cursor-pointer"
                    onClick={() =>
                      handleNavigate("create-match", `?match=${data._id}`)
                    }
                  />
                </td>
              )}

              {userConnecteRole !== "LICENSED" && (
                <td>
                  <Trash2
                    color="red"
                    className="cursor-pointer"
                    size={16}
                    onClick={() => {
                      handleNavigate(
                        "confirm-delete-match",
                        `?match=${data._id}&limit=${limit}`
                      );
                    }}
                  />
                </td>
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
  isAthome: boolean,
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
      className={cn([
        "text-red cursor-pointer",
        !isAthome && "pointer-events-none",
      ])}
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
