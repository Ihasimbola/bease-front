import React from "react";
import { matchTableHeader, matchData, postTableHeader } from "./matchData";
import AppText from "~/components/general/AppText/AppText";
import "./styles.css";
import { Link, useNavigate } from "react-router";
import type { MatchType } from "./type";

type Post = {
  licensedId: string;
  name: string;
  firstname: string;
  lastname: string;
};

export interface Props {
  headerData: typeof matchTableHeader;
  postHeaderData: typeof postTableHeader;
  bodyData: MatchType["matches"];
  tableTitle: string;
}

function Match(props: Props) {
  const { headerData, bodyData, tableTitle } = props;
  return matchTable(headerData, bodyData, tableTitle);
}

function matchTable(
  headData: Props["headerData"],
  bodyData: Props["bodyData"],
  tableTitle: string
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
              className="body-row"
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
                    {findPostCell(post, data.posts, data._id)}
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
  matchId: string
): React.ReactNode {
  const post = postsArray.find((post) => post.name === postHeaderData.dataKey);
  const navigate = useNavigate();

  return post ? (
    <AppText size="sm" weight="normal">
      {`${post?.firstname} ${post?.lastname}`}
    </AppText>
  ) : (
    <AppText
      className="text-red cursor-pointer"
      onClick={() =>
        navigate(`assign-post?match=${matchId}&post=${postHeaderData.dataKey}`)
      }
    >
      Inscription
    </AppText>
  );
}
export default Match;
