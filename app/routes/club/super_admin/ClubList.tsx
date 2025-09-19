import React, { Suspense } from "react";
import ClubCard from "./ClubCard";
import { ClubService } from "~/services/ClubService";
import AppText from "~/components/general/AppText/AppText";
import type { Route } from "../super_admin/+types/ClubList";
import type { ClubDataType } from "./types";
import Squeleton from "./Squeleton";

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
  const clubs = loaderData?.data as ClubDataType[];

  return (
    <>
      <section className="flex flex-col gap-2 xl:flex-row xl:justify-between">
        <div>
          <AppText weight="bold" size="2xl" as="h1">
            Liste des clubs
          </AppText>
          <AppText size="xs" color="gray" as="h2">
            Les informations concernant tout les clubs
          </AppText>
        </div>
      </section>
      <section className="mt-6 p-6 bg-white rounded-[20px]">
        <ul className="flex flex-wrap gap-8">
          {clubs?.map((club, idx) => (
            <li
              key={`club-${idx}`}
              className="bg-gray-100/35 p-6 rounded-[12px]"
            >
              <Suspense key={`club-${idx}`} fallback={<Squeleton />}>
                <ClubCard club={club} key={`club-${idx}`} />
              </Suspense>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

export default ClubList;
