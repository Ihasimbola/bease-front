import { PlusIcon } from "lucide-react";
import React, { useRef, useState } from "react";
import { Form, redirect, useFetcher } from "react-router";
import AppButton from "~/components/general/AppButton/AppButton";
import AppText from "~/components/general/AppText/AppText";
import { Input } from "~/components/ui/input";
import placeholderImage from "~/assets/images/placeholder_image.png";
import type { Route } from "./+types/CreateClub";
import { FileService } from "~/services/fileService";
import { ClubService } from "~/services/ClubService";

export async function clientAction({ request }: Route.ClientActionArgs) {
  const form = await request.formData();
  const formData = new FormData();
  formData.append("emblem", form.get("emblem")!);
  const res = await FileService.upload("club/emblem", form);

  let data = {} as any;
  for (let [key, value] of form.entries()) {
    if (key === "emblem") continue;
    if (key === "subteamNames") {
      if (Array.isArray(data["subteamNames"])) {
        data["subteamNames"] = [...data["subteamNames"], value];
        continue;
      } else {
        data["subteamNames"] = [value];
      }
    } else {
      data[key] = value;
    }
  }

  data["profileAdmin"] = JSON.parse(localStorage.getItem("user")!)._id;
  data["emblem"] = res.data._id;

  const club = await ClubService.createClub(data);

  return redirect("/club");
}

function CreateClub() {
  const fetcher = useFetcher();
  const [subTeam, setuSubTeam] = useState<{ name: string }[]>([]);
  const [file, setFile] = useState<any>();
  const emblemRef = useRef<HTMLInputElement>(null);

  const handleAddEmblem = () => {
    if (emblemRef.current) {
      emblemRef.current.click();
    }
  };

  const addEmblem = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = URL.createObjectURL(e.target.files![0]);
    setFile(selectedFile);
  };
  return (
    <section>
      <div className="flex flex-col gap-2 xl:flex-row xl:justify-between">
        <div>
          <AppText weight="bold" size="2xl" as="h1">
            Créer votre Club
          </AppText>
          <AppText size="xs" color="gray" as="h2">
            Remplir les informations necessaires concernant votre club
          </AppText>
        </div>
      </div>

      <Form className="mt-8" method="POST" encType="multipart/form-data">
        <div className="mb-4">
          <label htmlFor="name">
            <AppText weight="semibold">Nom du Club</AppText>
            <Input
              name="name"
              id="name"
              type="text"
              placeholder="BC Kunheim"
              className="max-w-[400px] mt-1"
              required
            />
          </label>
        </div>

        <div>
          <div className="flex gap-2 items-center mb-2">
            <AppText weight="semibold">Sous Clubs</AppText>
            <AppButton
              type="button"
              onClick={() => {
                setuSubTeam((prev) => {
                  const subTeam = [...prev];
                  subTeam.push({ name: "" });
                  return subTeam;
                });
              }}
            >
              <PlusIcon />
            </AppButton>
          </div>
          <div className="mb-6 flex flex-col gap-2">
            {subTeam.map((team, idx) => (
              <Input
                type="text"
                placeholder="Kunheim-1"
                key={`sub-${idx}`}
                name="subteamNames"
                className="max-w-[400px]"
              />
            ))}
          </div>
          <div className="flex flex-col gap-2 items-center w-fit">
            <input
              type="file"
              className="hidden"
              ref={emblemRef}
              onChange={addEmblem}
              name="emblem"
            />
            {!!file ? (
              <>
                <img src={file} alt="emblem" width="250px" height="auto" />
                <AppButton
                  onClick={handleAddEmblem}
                  variant="outlined"
                  type="button"
                >
                  Modifier l'embleme
                </AppButton>
              </>
            ) : (
              <>
                <img
                  src={placeholderImage}
                  alt="emblem"
                  width="250px"
                  height="auto"
                />
                <AppButton
                  onClick={handleAddEmblem}
                  type="button"
                  variant="outlined"
                >
                  Ajouter l'embleme
                </AppButton>
              </>
            )}
          </div>
        </div>

        <div className="mt-10 flex gap-4 mb-4">
          <AppButton type="submit">Créer mon Club</AppButton>
        </div>
      </Form>
    </section>
  );
}

export default CreateClub;
