import React, { Suspense, useCallback } from "react";
import ClubCard from "./ClubCard";
import { ClubService } from "~/services/ClubService";
import AppText from "~/components/general/AppText/AppText";
import type { Route } from "../super_admin/+types/ClubList";
import type { ClubDataType } from "./types";
import Squeleton from "./Squeleton";
import { useNavigate } from "react-router";

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
      <div className="w-full text-right">
        <AppText>
          Nombre total des clubs:
          <AppText as="span" weight="semibold">
            {` ${clubs?.length}`}
          </AppText>
        </AppText>
      </div>
      <section className="mt-6 p-6 bg-white rounded-[20px]">
        <ul className="flex flex-wrap gap-8">
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
