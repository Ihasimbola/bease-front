import Info from "./section/Info";
import Match from "./section/match/Match";
import {
  matchData,
  matchTableHeader,
  postTableHeader,
} from "./section/match/matchData";
import MatchAccordion from "./section/match/MatchAccordion";
import { Outlet } from "react-router";
import { ClubService } from "~/services/ClubService";
import type { Route } from "./+types/Planning";
import { MatchService } from "~/services/MatchService";
import type { MatchType } from "./section/match/type";

export async function clientLoader() {
  try {
    const res = await MatchService.getMatchByClub();
    console.log(res);
    return {
      message: "",
      data: res.data as MatchType[],
      error: null,
    };
  } catch (error) {
    return {
      message: "Une erreur est survenue",
      data: null,
      error,
    };
  }
}

function Planning({ loaderData }: Route.ComponentProps) {
  const matchData = loaderData?.data || [];

  return (
    <>
      <Info />
      <section className="hidden lg:flex w-full flex-col gap-10 mt-6">
        {matchData.map((match, idx) =>
          Match({
            headerData: matchTableHeader,
            bodyData: match.matches,
            postHeaderData: postTableHeader,
            tableTitle: new Date(match._id).toLocaleString("fr-FR", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            }),
          })
        )}
      </section>
      <section className="mt-6 lg:hidden">
        <MatchAccordion data={matchData} />
      </section>
      <Outlet />
    </>
  );
}

export default Planning;
