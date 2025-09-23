import CreateMatch from "../pages/create-match/CreateMatch";
import type { Route } from "../super_admin/+types/CreateMatch";
import { MatchService } from "~/services/MatchService";
import { data, redirect } from "react-router";
import { CreateMatchValidationSchema } from "../pages/create-match/createMatch-schema";
import z from "zod";

type Props = {};

export async function clientAction({
  request,
  params,
}: Route.ClientActionArgs) {
  const formData = await request.formData();
  const clubId = params.id;
  const url = new URL(request.url);
  const matchId = new URLSearchParams(url.search).get("match");

  if (!clubId) {
    return data({
      message: "Vous n' avez pas encore créé un club",
      data: null,
      error: null,
    });
  }

  // get match date and transform it
  const date = new Date(formData.get("matchDate")!.toString());

  // validate form
  const result = CreateMatchValidationSchema.safeParse({
    division: formData.get("division")?.toString(),
    teamA: formData.get("teamA")?.toString(),
    teamB: formData.get("teamB")?.toString(),
    place: formData.get("place")?.toString(),
    matchDate: date,
    startTime: formData.get("startTime")?.toString(),
  });

  // return error if there is
  if (result.error) {
    return data({
      error: z.flattenError(result.error).fieldErrors,
      data: null,
      message: null,
    });
  }

  // append startTime and clubId
  formData.append("clubId", clubId);

  try {
    // if matchId is present then call update method instead
    if (matchId) {
      const res = await MatchService.updateMatch(matchId, {
        division: formData.get("division")?.toString(),
        teamA: formData.get("teamA")?.toString(),
        teamB: formData.get("teamB")?.toString(),
        place: formData.get("place")?.toString(),
        matchDate: date.toISOString(),
        startTime: formData.get("startTime")?.toString(),
      });

      return redirect("/planning");
    }

    // create new match if matchId is not present
    const res = await MatchService.createMatch({
      division: formData.get("division")?.toString(),
      teamA: formData.get("teamA")?.toString(),
      teamB: formData.get("teamB")?.toString(),
      place: formData.get("place")?.toString(),
      matchDate: date.toISOString(),
      startTime: formData.get("startTime")?.toString(),
      clubId,
    });
    return redirect("/planning/clubs/details/" + clubId);
  } catch (error: any) {
    return data({
      error,
      data: null,
      message: error?.response?.data?.message || "Une erreur est survenue",
    });
  }
}

export async function clientLoader({ request }: Route.ClientLoaderArgs) {
  const url = new URL(request.url);
  const matchId = new URLSearchParams(url.search).get("match");

  if (!matchId) {
    return;
  }

  try {
    const match = await MatchService.getMatchById(matchId);
    return {
      data: match,
      message: "",
      error: null,
    };
  } catch (error: any) {
    return {
      message: error?.response?.data?.message || "Une erreur est survenue",
      data: null,
      error,
    };
  }
}

function CreateMatchSuperAdmin({ loaderData }: Route.ComponentProps) {
  return (
    <>
      <CreateMatch loaderData={loaderData} />
    </>
  );
}

export default CreateMatchSuperAdmin;
