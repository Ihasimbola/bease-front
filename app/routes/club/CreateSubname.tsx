import { Club, PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Form, redirect, useNavigate } from "react-router";
import Dialog from "~/components/common/dialog/Dialog";
import AppButton from "~/components/general/AppButton/AppButton";
import AppText from "~/components/general/AppText/AppText";
import { Input } from "~/components/ui/input";
import type { Route } from "./+types/CreateSubname";
import { SubteamService } from "~/services/SubteamService";
import { ClubService } from "~/services/ClubService";

export async function clientAction({
  request,
  params,
}: Route.ClientActionArgs) {
  const clubId = params.id;
  const formData = await request.formData();
  const subteamName = formData.get("subname");
  const club = await ClubService.getClub(clubId);

  const allPrecedentSubnames = club.subnames;

  try {
    const res = await ClubService.updateSubnames(clubId, [
      ...allPrecedentSubnames,
      subteamName?.toString(),
    ]);
    return redirect("/club/edit/" + params.id);
  } catch (error) {
    return {
      data: null,
      error,
      message: "Une erreur est survenue",
    };
  }
}

export default function CreateSubteamDialog() {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isOpen) navigate(-1);
  }, [isOpen]);

  return (
    <Dialog className="flex flex-col" close={isOpen} setIsOpen={setIsOpen}>
      <AppText color="black" weight="bold" as="h1">
        Ajouter un nom
      </AppText>
      <Form method="POST">
        <div className="mt-6">
          <label htmlFor="category">
            <AppText color="black">Nouveau nom</AppText>
          </label>
          <Input
            type="text"
            id="subname"
            placeholder="Kunheim-1"
            className="mt-2"
            name="subname"
          />
        </div>
        <div className="flex gap-6 mt-4">
          <AppButton type="submit">
            <PlusIcon />
            Ajouter
          </AppButton>
          <AppButton
            variant="outlined"
            type="submit"
            onClick={() => navigate(-1)}
          >
            Annuler
          </AppButton>
        </div>
      </Form>
    </Dialog>
  );
}
