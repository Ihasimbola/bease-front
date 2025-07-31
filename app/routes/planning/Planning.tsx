import React from "react";
import Info from "./section/Info";
import Match from "./section/match/Match";
import { matchData, matchTableHeader } from "./section/match/matchData";
import Pub from "../../components/layout/pub/Pub";

type Props = {};

function Planning({}: Props) {
  return (
    <>
      <Info />
      <section className="w-full flex flex-col gap-6 mt-6">
      {
        matchData.map((match, idx) => Match({
          headerData: matchTableHeader,
          bodyData: match.data,
          tableTitle: new Date(match.date).toLocaleString("fr-FR", {
            day: "2-digit",
            month: "long",
            year: "numeric"
          })
        }))
      }
      </section>
    </>
  );
}

export default Planning;
