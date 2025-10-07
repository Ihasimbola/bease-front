import { useFetcher, useNavigate } from "react-router";
import Dialog from "~/components/common/dialog/Dialog";
import AppButton from "~/components/general/AppButton/AppButton";
import AppText from "~/components/general/AppText/AppText";
import { useDialog } from "~/hooks/useDialog";
import type { Route } from "./+types/ConfirmDeleteAll";
import { MatchService } from "~/services/MatchService";
import { useEffect } from "react";
import { toast } from "sonner";

type Props = {};

export async function clientAction({ request }: Route.ClientActionArgs) {
  const matchesToDelete = localStorage.getItem("matchToDelete")
    ? JSON.parse(localStorage.getItem("matchToDelete")!)
    : [];

  try {
    for (let i = 0; i < matchesToDelete.length; ++i) {
      await MatchService.deleteMatch(matchesToDelete[i]);
    }

    // clear localstorage
    localStorage.setItem("matchToDelete", JSON.stringify([]));
    return (window.location.href = "/planning");
  } catch (error: any) {
    return {
      data: null,
      message: error?.response?.data?.message,
      error,
    };
  }
}

function ConfirmDeleteAll({ actionData }: Route.ComponentProps) {
  const { isOpen, setIsOpen } = useDialog();
  const navigate = useNavigate();
  const fetcher = useFetcher();

  useEffect(() => {
    if (actionData?.error) {
      toast.error(actionData?.message);
      navigate(-1);
    }
  }, [actionData]);

  return (
    <Dialog setIsOpen={setIsOpen} close={isOpen}>
      <AppText weight="bold">Êtes-vous sûre de vouloir supprimer?</AppText>
      <div className="flex gap-3 mt-4">
        <fetcher.Form method="DELETE">
          <AppButton type="submit">Confirmer</AppButton>
        </fetcher.Form>
        <AppButton
          variant="outlined"
          type="button"
          onClick={() => navigate(-1)}
        >
          Annuler
        </AppButton>
      </div>
    </Dialog>
  );
}

export default ConfirmDeleteAll;
