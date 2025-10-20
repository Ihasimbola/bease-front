import Dialog from "~/components/common/dialog/Dialog";
import type { Route } from "./+types/RemoveSubname";
import AppText from "~/components/general/AppText/AppText";
import AppButton from "~/components/general/AppButton/AppButton";
import { useEffect, useState } from "react";
import { Form, redirect, useNavigate } from "react-router";
import { CategoryService } from "~/services/CategoryService";
import { ClubService } from "~/services/ClubService";
import { toast } from "sonner";

export async function clientAction({
  request,
  params,
}: Route.ClientActionArgs) {
  const url = new URL(request.url);
  const subname = url.searchParams.get("subname")!;
  const club = await ClubService.getClub(params.id);
  if (!club) {
    return redirect("/club/edit/" + params.id);
  }

  const subnames: string[] = club.subnames;
  const toRemoveIdx = subnames.indexOf(subname);
  subnames.splice(toRemoveIdx, 1);
  try {
    const res = await ClubService.updateSubnames(params.id, subnames);
    return redirect("/club/edit/" + params.id);
  } catch (error) {
    return {
      data: null,
      error,
      message: "Une erreur est survenue",
    };
  }
}

export default function RemoveSubteam({ actionData }: Route.ComponentProps) {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (actionData?.error) {
      toast.error("Une erreur est survenue");
      navigate(-1);
    } else if (actionData?.message) {
      toast.error(actionData?.message);
      navigate(-1);
    }
  }, [actionData]);

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
