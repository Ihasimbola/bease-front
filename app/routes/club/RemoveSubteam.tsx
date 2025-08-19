import Dialog from "~/components/common/dialog/Dialog";
import type { Route } from "./+types/RemoveSubteam";
import AppText from "~/components/general/AppText/AppText";
import AppButton from "~/components/general/AppButton/AppButton";
import { useState } from "react";
import { Form, redirect, useNavigate } from "react-router";
import { SubteamService } from "~/services/SubteamService";
import { CategoryService } from "~/services/CategoryService";

export async function clientAction({
  request,
  params,
}: Route.ClientActionArgs) {
  const url = new URL(request.url);
  const subteam = url.searchParams.get("subteam")!;
  const res = await CategoryService.remove(subteam);
  return redirect("/club/edit/" + params.id);
}

export default function RemoveSubteam() {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  return (
    <Dialog setIsOpen={setIsOpen} close={isOpen}>
      <AppText weight="bold">Êtes-vous sûre de vouloir supprimer?</AppText>
      <div className="flex gap-3 mt-4">
        <Form method="DELETE">
          <AppButton type="submit">Confirmer</AppButton>
        </Form>
        <AppButton variant="outlined" onClick={() => navigate(-1)}>
          Annuler
        </AppButton>
      </div>
    </Dialog>
  );
}
