import { useEffect, useState } from "react";
import { data, redirect, useFetcher, useNavigate } from "react-router";
import Dialog from "~/components/common/dialog/Dialog";
import AppButton from "~/components/general/AppButton/AppButton";
import AppText from "~/components/general/AppText/AppText";
import type { Route } from "./+types/ConfirmationDialog";
import { UserService } from "~/services/userService";
import { LoaderCircle } from "lucide-react";

interface Props {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export async function clientAction({ params }: Route.ClientActionArgs) {
  try {
    const res = await UserService.deleteLicensed(params.id);
    return redirect("/membre");
  } catch (error: any) {
    return data({
      message: error?.response?.data?.message || "Une erreur est survenue",
      data: null,
      error,
    });
  }
}

function DeleteConfirmationDialog({ actionData }: Route.ComponentProps) {
  const [isOpen, setIsOpen] = useState(true);
  const fetcher = useFetcher();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isOpen) navigate(-1);
  }, [isOpen]);

  return (
    <Dialog setIsOpen={setIsOpen} close={isOpen}>
      <AppText weight="bold">Confirmer la suppression</AppText>
      <fetcher.Form method="DELETE" className="flex gap-3 mt-4">
        <AppButton>
          {fetcher.state !== "idle" ? (
            <LoaderCircle
              className="loader-circle"
              id="loader-circle"
              stroke="stroke-white"
            />
          ) : (
            "Confirmer"
          )}
        </AppButton>
        <AppButton
          variant="outlined"
          type="button"
          onClick={() => navigate(-1)}
        >
          Annuler
        </AppButton>
      </fetcher.Form>
    </Dialog>
  );
}

export default DeleteConfirmationDialog;
