import { PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Form, redirect, useNavigate } from "react-router";
import Dialog from "~/components/common/dialog/Dialog";
import AppButton from "~/components/general/AppButton/AppButton";
import AppText from "~/components/general/AppText/AppText";
import { Input } from "~/components/ui/input";
import type { Route } from "./+types/CreateSubteam";
import { SubteamService } from "~/services/SubteamService";

export async function clientAction({
  request,
  params,
}: Route.ClientActionArgs) {
  const clubId = params.id;
  const formData = await request.formData();
  const subteamName = formData.get("name");

  if (!subteamName) {
    return;
  }

  const res = await SubteamService.addSubteam(clubId, {
    name: subteamName.toString(),
  });

  return redirect("/club/edit/" + params.id);
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
        Creation d' Equipe
      </AppText>
      <Form method="POST">
        <div className="mt-6">
          <label htmlFor="category">
            <AppText color="black">Nom de l' équipe</AppText>
          </label>
          <Input
            type="text"
            id="category"
            placeholder="Kunheim-1"
            className="mt-2"
            name="name"
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
