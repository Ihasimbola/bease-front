import Info from "./section/Info";
import {
  Outlet,
  redirect,
  useLocation,
  useNavigate,
  useOutletContext,
  useSearchParams,
} from "react-router";
import type { Route } from "./+types/Planning";
import { MatchService } from "~/services/MatchService";
import type { MatchType } from "./section/match/type";
import {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { useMatchStore } from "~/store/matchStore";
import { useUserStore } from "~/store/userStore";
import { toast } from "sonner";
import { chekcIfSuperAdmin } from "~/lib/utils";
import MatchDetail from "./MatchDetail";
import { SelectAllContext } from "~/hooks/useSelectedAllContext";
import MatchFilters from "./section/match/MatchFilters";
import { filters } from "./data/filterData";
import { handleDeleteSelect } from "./section/match/handeDeleteSelect";

export const limitInitialValue = 4;

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

export async function clientLoader({ request }: Route.ClientLoaderArgs) {
  const { isSuperAdmin } = await chekcIfSuperAdmin();
  if (isSuperAdmin) {
    return redirect("/planning/clubs");
  }

  const url = new URL(request.url);
  const skip = url.searchParams.get("skip") || 0;
  const limit = url.searchParams.get("limit") || 0;
  const mode = url.searchParams.get("mode") || "";
  const args = url.searchParams.get("args") || "";

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
    const res = await MatchService.getMatchByClub(
      +skip,
      +limit,
      "",
      mode,
      args
    );
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
  const userConnected = useUserStore((state) => state.user);
  const [total, setTotal] = useState(limitInitialValue);
  const location = useLocation();
  const [_, setSearchParam] = useSearchParams();
  const userConnecteRole: string | undefined = useOutletContext();
  const [selectAllState, setSelectAllState] = useState(false);
  const [filterItems, setFilterItems] = useState(filters);
  const [matchsToDelete, setMatchsToDelete] = useState(
    createMatchToDeleteData(matchDataFromLoader)
  );
  const [monthSelect, setMonthSelect] = useState(new Date().getMonth() + 1);
  const [yearFilter, setYearFilter] = useState(new Date().getFullYear());
  const [bubbleLimit, setBubbleLimit] = useState(Number(7).toString());
  const navigate = useNavigate();

  // handle change bubble limi
  function handleChangeBubbleLimit(limit: string) {
    setBubbleLimit(limit);
  }

  // handle change select month
  function handleChangeSelectMonth(monthIdx: number) {
    setMonthSelect(monthIdx);
  }

  function handleChangeYearFilter(value: string) {
    setYearFilter(+value);
  }

  // update matchs to delete if match from loader change
  useEffect(() => {
    setMatchsToDelete(createMatchToDeleteData(matchDataFromLoader));
  }, [matchDataFromLoader]);

  // select all matchs for deleting context
  const selectAllMatchsContext = useContext(SelectAllContext);

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
    const currentQuery = getCurrentQuery();

    setSearchParam({
      ...currentQuery,
      skip: "0",
      limit: total.toString(),
    });

    setTotal((prevState) => prevState + 2); // add total for next request
    localStorage.setItem("skip", "0");
    localStorage.setItem("limit", total.toString());
  };

  // make filter into bubble mode in first render
  useLayoutEffect(() => {
    handleToggleActiveFilter(
      filterItems.find((filter) => filter.mode === "bubble")!.id
    );
  }, []);

  // all about match filters
  const handleToggleActiveFilter = (id: string | number) => {
    setFilterItems((prevState) => {
      return prevState.map((item) =>
        item.id.toString() === id.toString()
          ? { ...item, active: true }
          : { ...item, active: false }
      );
    });

    const mode = filterItems.find(
      (item) => item.id.toString() === id.toString()
    )?.mode;

    const currentQuery = getCurrentQuery();

    // set the query in the path and add mode
    if (mode) {
      // remove mode if all is active
      if (mode === "all") {
        // delete all query for getting all match
        delete currentQuery.mode;
        delete currentQuery.args;
        setSearchParam({
          ...currentQuery,
        });
        return;
      } else if (mode === "byMonth") {
        setSearchParam({
          ...currentQuery,
          mode,
          args: `${monthSelect}-${yearFilter}`,
        });
        return;
      } else if (mode === "bubble") {
        setSearchParam({
          args: bubbleLimit,
          mode: mode,
        });
      } else if (mode === "today") {
        setSearchParam({
          mode: "today",
        });
      }
    }
  };

  // get current query function
  const getCurrentQuery = () => {
    // get the query in url
    const currentQueryString = new URLSearchParams(location.search);
    let currentQuery = {} as any;

    // transform these query to an object
    if (currentQueryString.size) {
      for (const [key, value] of currentQueryString.entries()) {
        currentQuery[key] = value;
      }
    }
    return currentQuery;
  };

  // navigate for each cell in match table for preventing more renders hook
  // we must declare it from the parent
  // then all children can use it
  const handleNavigate = useCallback(
    (path: string, query: string) => {
      navigate(path + query);
    },
    [navigate]
  );

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

  // toggle all checked state of matchs to delete depends on select all context
  useEffect(() => {
    if (selectAllState) {
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
  }, [selectAllState]);

  // change select all context if path change
  useEffect(() => {
    // do not remove all selected match to delete if confirmation modal path appear
    if (location.pathname.includes("delete-selected")) {
      return;
    }
    setSelectAllState(false);
  }, [location]);

  // add and remove matchs to delete in localstorage
  useEffect(() => {
    if (selectAllState) {
      localStorage.setItem(
        "matchToDelete",
        JSON.stringify(matchsToDelete.map((match) => match.id))
      );
    } else {
      localStorage.setItem("matchToDelete", JSON.stringify([]));
    }
  }, [selectAllState]);

  return (
    <>
      <SelectAllContext.Provider value={selectAllState}>
        <Info setSelectAllState={setSelectAllState} />
        {!location.pathname.includes("create-match") &&
          !location.pathname.includes("edit-match") && (
            <>
              <MatchFilters
                filterData={filterItems}
                handleToggleActiveFilter={handleToggleActiveFilter}
                handleChangeSelectMonth={handleChangeSelectMonth}
                yearFilter={yearFilter.toString()}
                handleChangeYearFilter={handleChangeYearFilter}
                activeFilter={filterItems.find((filter) => filter.active)?.mode}
                bubbleLimit={bubbleLimit}
                handleChangeBubbleLimit={handleChangeBubbleLimit}
              />
              <MatchDetail
                matchData={matchDataFromLoader}
                matchsToDelete={matchsToDelete}
                handleChangeSelect={handleChangeSelect}
                userConnecteRole={userConnecteRole}
                userConnected={userConnected}
                handleNavigate={handleNavigate}
                handleGetMore={handleGetMore}
              />
            </>
          )}
      </SelectAllContext.Provider>
      <Outlet />
    </>
  );
}

export default Planning;
