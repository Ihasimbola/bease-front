import React, { useEffect, useRef } from "react";
import type { Route } from "./+types/Confirm";
import {
  data,
  NavLink,
  useFetcher,
  useNavigate,
  useSubmit,
} from "react-router";
import AppText from "~/components/general/AppText/AppText";
import { UserService } from "~/services/userService";
import { toast } from "sonner";
import { Toaster } from "~/components/ui/sonner";
import { CheckCircle, CircleX, Loader2 } from "lucide-react";
import AppButton from "~/components/general/AppButton/AppButton";

type Props = {};

export async function clientAction({ request }: Route.ClientActionArgs) {
  const url = new URL(request.url);
  const key = new URLSearchParams(url.search).get("key");
  try {
    if (!key) {
      return data({
        message: "La clé est manquante",
        data: null,
        isError: true,
      });
    }
    const res = await UserService.confirmLicensed(key);
    return data({
      message: "Vous etes maintenant inscrit",
      data: res,
      isError: false,
    });
  } catch (error) {
    return data({
      message: "Une erreur est survenue",
      data: null,
      isError: true,
    });
  }
}

function Confirm({ actionData }: Route.ComponentProps) {
  const fetcher = useFetcher();
  const submitRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (submitRef.current) {
      submitRef.current.click();
    }
  }, []);

  return (
    <>
      <fetcher.Form
        method="post"
        id="form"
        className="w-screen h-screen flex items-center justify-center"
      >
        {fetcher.state === "submitting" ? (
          <div className="flex flex-col gap-4 items-center justify-center h-fit p-10 rounded-[20px] border shadow">
            <Loader2 className="animate-spin" size={54} strokeWidth={2} />
            <AppText size="lg" weight="normal" color="gray">
              Confirmation de votre compte en cours...
            </AppText>
          </div>
        ) : (
          <>{messageContent(fetcher.data?.isError, fetcher.data?.message)}</>
        )}
        <button type="submit" ref={submitRef} className="hidden">
          confirm
        </button>
      </fetcher.Form>
      <Toaster />
    </>
  );
}

function messageContent(isError: boolean, message: string) {
  const content = isError ? (
    <div className="flex flex-col items-center gap-2">
      <CircleX size={54} color="red" />
      <AppText color="red" size="lg" weight="normal">
        {message}
      </AppText>
    </div>
  ) : (
    <div className="flex flex-col items-center gap-2">
      <CheckCircle size={54} color="green" />
      <AppText color="gray" size="lg" weight="normal">
        {message}
      </AppText>
      <NavLink to="/auth/login" target="_blank">
        <AppButton type="button">Continuer dans l'application</AppButton>
      </NavLink>
    </div>
  );

  return content;
}

export default Confirm;
