import Info from "./section/Info";

import {
  Outlet,
  redirect,
  useFetcher,
  useLocation,
  useNavigate,
  useOutletContext,
  useSearchParams,
} from "react-router";
import type { Route } from "./+types/Planning";
import { MatchService } from "~/services/MatchService";
import type { MatchType } from "./section/match/type";
import { useCallback, useEffect, useState } from "react";
import { useMatchStore } from "~/store/matchStore";
import { useUserStore } from "~/store/userStore";
import { toast } from "sonner";
import { chekcIfSuperAdmin } from "~/lib/utils";
import MatchDetail from "./MatchDetail";
import { SelectAllContext } from "~/hooks/useSelectedAllContext";

export const limitInitialValue = 4;
export async function clientLoader({ request }: Route.ClientLoaderArgs) {
  const { isSuperAdmin } = await chekcIfSuperAdmin();
  if (isSuperAdmin) {
    return redirect("/planning/clubs");
  }

  const url = new URL(request.url);
  const skip = url.searchParams.get("skip") || 0;
  const limit = url.searchParams.get("limit") || 0;

  // check first if the user have a club
  const club = JSON.parse(localStorage.getItem("user")!)?.club;

  if (!club) {
    return {
      message: "Vous n' avez pas encore créé un club",
      data: null,
      error: null,
    };
  }

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
  const [total, setTotal] = useState(limitInitialValue);
  const location = useLocation();
  const fetcher = useFetcher();
  const [searchParam, setSearchParam] = useSearchParams();
  const userConnecteRole: string | undefined = useOutletContext();
  const [selectAllState, setSelectAllState] = useState(false);

  useEffect(() => {
    if (loaderData?.message) {
      toast.error(loaderData.message);
    }
  }, [loaderData?.message]);

  useEffect(() => {
    if (location.pathname === "/planning") {
      setMatchStore(matchDataFromLoader);
    }

    // get scroll position from local storage and set the scroll of the page to it
    const scrollPosition = localStorage.getItem("scrollPosition");
    if (scrollPosition) {
      window.scrollTo(0, +scrollPosition);
    }
  }, [loaderData.data]);

  // reset limit value to the initial value when the user changes the page
  useEffect(() => {
    if (!location.search.includes("limit")) {
      setTotal(limitInitialValue);
    }
  }, [location]);

  // get more match from server
  const handleGetMore = async () => {
    setSearchParam({
      skip: "0",
      limit: total.toString(),
    });

    setTotal((prevState) => prevState + 2); // add total for next request
    localStorage.setItem("skip", "0");
    localStorage.setItem("limit", total.toString());
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
      <SelectAllContext.Provider value={selectAllState}>
        <Info setSelectAllState={setSelectAllState} />
        {!location.pathname.includes("create-match") &&
          !location.pathname.includes("edit-match") && (
            <MatchDetail
              matchData={matchDataFromLoader}
              userConnecteRole={userConnecteRole}
              userConnected={userConnected}
              handleNavigate={handleNavigate}
              handleGetMore={handleGetMore}
            />
          )}
      </SelectAllContext.Provider>
      <Outlet />
    </>
  );
}

export default Planning;
