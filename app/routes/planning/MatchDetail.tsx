import { matchTableHeader, postTableHeader } from "./section/match/matchData";
import type { MatchType } from "./section/match/type";
import Match from "./section/match/Match";
import MatchAccordion from "./section/match/MatchAccordion";
import AppButton from "~/components/general/AppButton/AppButton";
import { useContext, useEffect, useState } from "react";
import { handleDeleteSelect } from "./section/match/handeDeleteSelect";
import { SelectAllContext } from "~/hooks/useSelectedAllContext";

interface Props {
  userConnecteRole: string | undefined;
  userConnected: any;
  handleNavigate: (path: string, query: string) => void;
  matchData: MatchType[];
  handleGetMore: () => void;
}

const createMatchToDeleteData = (matchs: MatchType[]) => {
  const data = matchs.map((match) => match.matches);
  const dataToDelete = [];
  for (let i = 0; i < data.length; ++i) {
    for (let j = 0; j < data[i].length; ++j) {
      dataToDelete.push(data[i][j]);
    }
  }
  return dataToDelete.map((match) => ({ id: match._id, checked: false }));
};

function MatchDetail(props: Props) {
  const {
    matchData,
    userConnecteRole,
    userConnected,
    handleNavigate,
    handleGetMore,
  } = props;

  const [matchsToDelete, setMatchsToDelete] = useState<
    { id: string; checked: boolean }[]
  >(createMatchToDeleteData(matchData));

  // select all matchs for deleting context
  const selectAllMatchsContext = useContext(SelectAllContext);

  const handleChangeSelect = (e: boolean, matchId: string) => {
    setMatchsToDelete((prev) => {
      return prev.map((match, idx) => {
        if (match.id === matchId) {
          return {
            id: match.id,
            checked: e,
          };
        } else {
          return {
            id: match.id,
            checked: prev[idx].checked,
          };
        }
      });
    });

    // update value in localstorage
    handleDeleteSelect(matchId, e);
  };

  // toggle all state depends on select all context
  useEffect(() => {
    if (selectAllMatchsContext) {
      setMatchsToDelete((prevState) => {
        return prevState.map((match) => ({
          id: match.id,
          checked: true,
        }));
      });
    } else {
      setMatchsToDelete((prevState) => {
        return prevState.map((match) => ({
          id: match.id,
          checked: false,
        }));
      });
    }
  }, [selectAllMatchsContext]);

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
            matchsToDelete: matchsToDelete,
            handleChangeSelect: handleChangeSelect,
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
