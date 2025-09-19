import { Outlet } from "react-router";
import AppText from "~/components/general/AppText/AppText";
import { ClubService } from "~/services/ClubService";
import type { Route } from "../super_admin/+types/ClubList";
import type { ClubDataType } from "./types";

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

function AllClubs({ loaderData }: Route.ComponentProps) {
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
      <Outlet />
    </>
  );
}

export default AllClubs;
