import Info from "./section/Info";
import Match from "./section/match/Match";
import { matchData, matchTableHeader } from "./section/match/matchData";
import MatchAccordion from "./section/match/MatchAccordion";

type Props = {};

function Planning({}: Props) {
  return (
    <>
      <Info />
      <section className="hidden lg:flex w-full flex-col gap-6 mt-6">
        {matchData.map((match, idx) =>
          Match({
            headerData: matchTableHeader,
            bodyData: match.data,
            tableTitle: new Date(match.date).toLocaleString("fr-FR", {
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
    </>
  );
}

export default Planning;
