import Info from "./section/Info";
import Match from "./section/match/Match";
import {
  matchData,
  matchTableHeader,
  postTableHeader,
} from "./section/match/matchData";
import MatchAccordion from "./section/match/MatchAccordion";
import {
  Outlet,
  useFetcher,
  useLocation,
  useNavigate,
  useOutletContext,
  useSearchParams,
} from "react-router";
import { ClubService } from "~/services/ClubService";
import type { Route } from "./+types/Planning";
import { MatchService } from "~/services/MatchService";
import type { MatchType } from "./section/match/type";
import { useCallback, useEffect, useState } from "react";
import { useMatchStore } from "~/store/matchStore";
import AppButton from "~/components/general/AppButton/AppButton";
import { useUserStore } from "~/store/userStore";

export async function clientLoader({ request }: Route.ClientLoaderArgs) {
  const url = new URL(request.url);
  const skip = url.searchParams.get("skip") || 0;
  const limit = url.searchParams.get("limit") || 0;

  try {
    const res = await MatchService.getMatchByClub(+skip, +limit);
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
  const matchDataFromLoader = loaderData?.data || [];
  const setMatchStore = useMatchStore((state) => state.setData);
  const updateMatchStore = useMatchStore((state) => state.pushData);
  const matchData = useMatchStore((state) => state.data);
  const userConnected = useUserStore((state) => state.user);
  const [total, setTotal] = useState(4);
  const location = useLocation();
  const fetcher = useFetcher();
  const [searchParam, setSearchParam] = useSearchParams();
  const userConnecteRole: string | undefined = useOutletContext();

  // console.log(userConnected);

  useEffect(() => {
    if (location.pathname === "/planning") {
      setMatchStore(matchDataFromLoader);
    }
  }, [loaderData.data]);

  // get more match from server
  const handleGetMore = async () => {
    setSearchParam({
      skip: "0",
      limit: total.toString(),
    });

    setTotal((prevState) => prevState + 2); // add total for next request
  };

  const navigate = useNavigate();

  // navigate for each cell in match table for preventing more renders hook
  // we must declare it from the parent
  // then all children can use it
  const handleNavigate = useCallback(
    (path: string, query: string) => {
      navigate(path + query);
    },
    [navigate]
  );

  return (
    <>
      <Info />
      <section className="hidden lg:flex w-full flex-col gap-10 mt-6">
        {matchDataFromLoader?.map((match, idx) =>
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
        {matchDataFromLoader.length !== 0 && (
          <div className="w-full m-auto">
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
      </section>
      <section className="mt-6 lg:hidden">
        <MatchAccordion data={matchData} />
      </section>
      <Outlet />
    </>
  );
}

export default Planning;
