import { data, redirect, useFetcher, useNavigate } from "react-router";
import AppButton from "~/components/general/AppButton/AppButton";
import AppText from "~/components/general/AppText/AppText";
import { Input } from "~/components/ui/input";
import type { Route } from "./+types/CreateMatch";
import { formatTime } from "~/lib/utils";
import { CreateMatchValidationSchema } from "./createMatch-schema";
import z from "zod";
import { MatchService } from "~/services/MatchService";
import { LoaderCircle } from "lucide-react";
import "../../styles.css";

export async function clientAction({ request }: Route.ClientActionArgs) {
  const formData = await request.formData();
  const clubId = JSON.parse(localStorage.getItem("user")!).club;

  if (!clubId) {
    return data({
      message: "Vouss n' avez pas encore créé un club",
      data: null,
      error: null,
    });
  }

  // get match date and transform it
  const date = new Date(formData.get("matchDate")!.toString());
  const starTime = formatTime(date);

  // validate form
  const result = CreateMatchValidationSchema.safeParse({
    division: formData.get("division")?.toString(),
    teamA: formData.get("teamA")?.toString(),
    teamB: formData.get("teamB")?.toString(),
    place: formData.get("place")?.toString(),
    matchDate: date,
    startTime: starTime,
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
  formData.append("startTime", starTime);
  formData.append("clubId", clubId);

  try {
    const res = await MatchService.createMatch({
      division: formData.get("division")?.toString(),
      teamA: formData.get("teamA")?.toString(),
      teamB: formData.get("teamB")?.toString(),
      place: formData.get("place")?.toString(),
      matchDate: date.toISOString(),
      startTime: starTime,
      clubId,
    });
    return redirect("/planning");
  } catch (error: any) {
    return data({
      error,
      data: null,
      message: error.message,
    });
  }
  return;
}

function CreateMatch() {
  const fetcher = useFetcher();
  const navigate = useNavigate();
  const errors = fetcher.data?.error;

  console.log(errors);

  return (
    <section className="mt-8 bg-white rounded-[20px] p-5">
      <div>
        <AppText size="lg" weight="semibold">
          Création de match
        </AppText>
      </div>
      <fetcher.Form method="post" className="flex flex-col gap-8 mt-4">
        <div className="sm:flex-row flex w-full flex-col gap-5">
          <div className="flex flex-col flex-1 gap-1">
            <label htmlFor="division">
              <AppText weight="semibold" size="sm">
                Division
              </AppText>
            </label>
            <Input
              placeholder="DFU11-P2"
              type="text"
              name="division"
              id="division"
            />
            {errors?.division && (
              <AppText size="xs" color="red">
                {errors.division[0]}
              </AppText>
            )}
          </div>

          <div className="flex flex-col flex-1 gap-1">
            <label htmlFor="date">
              <AppText weight="semibold" size="sm">
                Date du match
              </AppText>
            </label>
            <Input type="datetime-local" name="matchDate" id="date" />
            {errors?.matchDate && (
              <AppText size="xs" color="red">
                {errors.matchDate[0]}
              </AppText>
            )}
          </div>
        </div>

        <div className="sm:flex-row flex w-full flex-col gap-5">
          <div className="flex flex-col flex-1 gap-1">
            <label htmlFor="teamA">
              <AppText weight="semibold" size="sm">
                Equipe A
              </AppText>
            </label>
            <Input
              placeholder="BC KUNHEIM"
              type="text"
              name="teamA"
              id="teamA"
            />
            {errors?.teamA && (
              <AppText size="xs" color="red">
                {errors.teamA[0]}
              </AppText>
            )}
          </div>

          <div className="flex flex-col flex-1 gap-1">
            <label htmlFor="teamB">
              <AppText weight="semibold" size="sm">
                Equipe B
              </AppText>
            </label>
            <Input
              placeholder="FCSL EGUISHEIM"
              type="text"
              name="teamB"
              id="teamB"
            />
            {errors?.teamB && (
              <AppText size="xs" color="red">
                {errors.teamB[0]}
              </AppText>
            )}
          </div>

          {/* <div>
            <label htmlFor="teamA">
            <AppText weight="semibold">Equipe A</AppText>
          </label>
          <Input 
            placeholder='BC KUNHEIM'
            type="text"
            name="teamA"
            id="teamA"
          />
          </div> */}
        </div>

        <div className="sm:flex-row flex w-full flex-col gap-5">
          <div className="flex flex-col flex-1 gap-1">
            <label htmlFor="place">
              <AppText weight="semibold" size="sm">
                Lieu du match
              </AppText>
            </label>
            <Input
              placeholder="SALLE DES SPORTS"
              type="text"
              name="place"
              id="place"
            />
            {errors?.place && (
              <AppText size="xs" color="red">
                {errors.place[0]}
              </AppText>
            )}
          </div>

          {/* <div>
            <label htmlFor="teamA">
            <AppText weight="semibold">Equipe A</AppText>
          </label>
          <Input 
            placeholder='BC KUNHEIM'
            type="text"
            name="teamA"
            id="teamA"
          />
          </div> */}
        </div>

        <div className="sm:flex-row flex w-full gap-2">
          <AppButton type="submit" className="flex-1 xl:flex-grow-0">
            {fetcher.state !== "idle" ? (
              <LoaderCircle
                className="loader-circle"
                id="loader-circle"
                stroke="stroke-white"
              />
            ) : (
              "Ajouter"
            )}
          </AppButton>
          <AppButton
            type="button"
            variant="outlined"
            className="flex-1 xl:flex-grow-0"
            onClick={() => navigate(-1)}
          >
            Annuler
          </AppButton>
        </div>
      </fetcher.Form>
    </section>
  );
}

export default CreateMatch;
