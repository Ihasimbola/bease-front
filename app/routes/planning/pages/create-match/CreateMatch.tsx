import React from "react";
import { useFetcher, useNavigate } from "react-router";
import AppButton from "~/components/general/AppButton/AppButton";
import AppText from "~/components/general/AppText/AppText";
import { Input } from "~/components/ui/input";

type Props = {};

function CreateMatch({}: Props) {
  const fetcher = useFetcher();
  const navigate = useNavigate();

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
              name="dividion"
              id="division"
            />
          </div>

          <div className="flex flex-col flex-1 gap-1">
            <label htmlFor="date">
              <AppText weight="semibold" size="sm">
                Date du match
              </AppText>
            </label>
            <Input
              placeholder="DFU11-P2"
              type="datetime-local"
              name="matchDate"
              id="date"
            />
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
            Créer
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
