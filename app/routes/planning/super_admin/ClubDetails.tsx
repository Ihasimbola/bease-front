import type { Route } from "../super_admin/+types/ClubDetails";
import { MatchService } from "~/services/MatchService";
import type { MatchType } from "../section/match/type";
import ImportAndAdd from "../ImportAndAdd";
import {
  Outlet,
  useLocation,
  useNavigate,
  useOutletContext,
  useSearchParams,
} from "react-router";
import AppText from "~/components/general/AppText/AppText";
import MatchDetail from "../MatchDetail";
import { useCallback, useState } from "react";
import { limitInitialValue } from "../Planning";

export async function clientLoader({
  request,
  params,
}: Route.ClientLoaderArgs) {
  try {
    const url = new URL(request.url);
    const skip = url.searchParams.get("skip") || 0;
    const limit = url.searchParams.get("limit") || 0;
    const userConnected = JSON.parse(localStorage.getItem("user")!);

    // check first if the user have a club
    const club = params.id;

    if (!club) {
      return {
        message: "Impossible de récupérer l' ID du club",
        data: null,
        error: null,
      };
    }

    try {
      const res = await MatchService.getMatchByClub(+skip, +limit, club);
      return {
        message: "",
        data: {
          match: res.data as MatchType[],
          userConnected,
        },
        error: null,
      };
    } catch (error) {
      return {
        message: "Une erreur est survenue",
        data: null,
        error,
      };
    }
  } catch (error) {
    return {
      error,
      message: "Une erreur est survenue",
      data: null,
    };
  }
}

function ClubDetails({ loaderData }: Route.ComponentProps) {
  const matchData = loaderData?.data?.match || [];
  const userConnected = loaderData?.data?.userConnected;
  const context = useOutletContext<{ role: string }>();
  const navigate = useNavigate();
  const [searchParam, setSearchParam] = useSearchParams();
  const [total, setTotal] = useState(limitInitialValue);
  const location = useLocation();

  // navigate for each cell in match table for preventing more renders hook
  // we must declare it from the parent
  // then all children can use it
  const handleNavigate = useCallback(
    (path: string, query: string) => {
      navigate(path + query);
    },
    [navigate]
  );

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

  return (
    <section>
      <ImportAndAdd />
      {matchData?.length === 0 ? (
        <div className="mt-6">
          <AppText>il n'y a pas encore de match dans ce club</AppText>
        </div>
      ) : (
        !location.pathname.includes("create-match") && (
          <MatchDetail
            matchData={matchData}
            userConnecteRole={context?.role}
            userConnected={userConnected}
            handleNavigate={handleNavigate}
            handleGetMore={handleGetMore}
          />
        )
      )}
      <Outlet />
    </section>
  );
}

export default ClubDetails;
