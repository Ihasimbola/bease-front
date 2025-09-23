import { matchTableHeader, postTableHeader } from "./section/match/matchData";
import type { MatchType } from "./section/match/type";
import Match from "./section/match/Match";
import MatchAccordion from "./section/match/MatchAccordion";
import AppButton from "~/components/general/AppButton/AppButton";

interface Props {
  userConnecteRole: string | undefined;
  userConnected: any;
  handleNavigate: (path: string, query: string) => void;
  matchData: MatchType[];
  handleGetMore: () => void;
}

function MatchDetail(props: Props) {
  const {
    matchData,
    userConnecteRole,
    userConnected,
    handleNavigate,
    handleGetMore,
  } = props;

  return (
    <>
      <section className="hidden lg:flex w-full flex-col gap-10 mt-6">
        {matchData?.map((match, idx) =>
          Match({
            userConnecteRole,
            userConnected,
            handleNavigate,
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
      {!location.pathname.includes("create-match") &&
        !location.pathname.includes("edit-match") && (
          <section className="mt-6 lg:hidden">
            <MatchAccordion
              data={matchData}
              handleNavigate={handleNavigate}
              userConnecteRole={userConnecteRole}
              userConnected={userConnected}
            />
          </section>
        )}
      {matchData.length !== 0 &&
        !location.pathname.includes("create-match") &&
        !location.pathname.includes("edit-match") && (
          <div className="w-full mt-8">
            <AppButton
              variant="outlined"
              className=""
              type="button"
              onClick={handleGetMore}
            >
              Afficher plus de matchs
            </AppButton>
          </div>
        )}
    </>
  );
}

export default MatchDetail;
