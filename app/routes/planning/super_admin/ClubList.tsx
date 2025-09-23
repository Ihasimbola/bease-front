import { Suspense, useCallback } from "react";
import ClubCard from "../../club/super_admin/ClubCard";
import { ClubService } from "~/services/ClubService";
import AppText from "~/components/general/AppText/AppText";
import type { ClubDataType } from "../../club/super_admin/types";
import Squeleton from "../../club/super_admin/Squeleton";
import { useNavigate } from "react-router";
import type { Route } from "../super_admin/+types/ClubList";

export async function clientLoader() {
  try {
    const res = await ClubService.getAllClubs();
    return {
      data: res,
      message: "",
      error: null,
    };
  } catch (error) {
    return {
      error,
      message: "Une erreur est survenue",
      data: null,
    };
  }
}

function ClubList({ loaderData }: Route.ComponentProps) {
  const navigate = useNavigate();
  const clubs = loaderData?.data as ClubDataType[];

  // navigate for each cell in match table for preventing more renders hook
  // we must declare it from the parent
  // then all children can use it
  const handleNavigate = useCallback(
    (path: string, query?: string) => {
      const completePath = path + (query ? `${query}` : "");
      navigate(completePath);
    },
    [navigate]
  );

  return (
    <>
      <div className="w-full text-right mt-5">
        <AppText>
          Nombre total des clubs:
          <AppText as="span" weight="semibold">
            {` ${clubs?.length}`}
          </AppText>
        </AppText>
      </div>
      <section className="mt-6 p-6 bg-white rounded-[20px]">
        <AppText weight="bold" size="lg" className="underline">
          Selectionner un club pour voir ses plannings
        </AppText>
        <ul className="flex flex-wrap gap-8 mt-5">
          {clubs?.map((club, idx) => (
            <li key={`club-${idx}`}>
              <Suspense key={`club-${idx}`} fallback={<Squeleton />}>
                <ClubCard
                  club={club}
                  key={`club-${idx}`}
                  handleNavigate={handleNavigate}
                />
              </Suspense>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

export default ClubList;
