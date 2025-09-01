import React, { useEffect, useState } from "react";
import { data, Form, redirect, useNavigate } from "react-router";
import Dialog from "~/components/common/dialog/Dialog";
import AppButton from "~/components/general/AppButton/AppButton";
import AppText from "~/components/general/AppText/AppText";
import { useDialog } from "~/hooks/useDialog";
import { PostService } from "~/services/PostService";
import { useFetcherEffect } from "~/hooks/useFetcherEffect";
import { MatchService } from "~/services/MatchService";
import type { Route } from "../../match/+types/ConfirmDeleteMatch";

type Props = {};

export async function clientAction({ request }: Route.ClientActionArgs) {
  const url = new URL(request.url);
  const matchId = new URLSearchParams(url.search).get("match");

  if (!matchId) {
    return redirect("/planning");
  }

  try {
    const res = await MatchService.deleteMatch(matchId!);
    return data({
      message: "",
      data: res.data,
      error: null,
    });
  } catch (error) {
    return data({
      message: "Uen erreur est survenue",
      data: null,
      error,
    });
  }
}

function ConfirmDeleteMatch({}: Props) {
  const { isOpen, setIsOpen } = useDialog();
  const { fetcher } = useFetcherEffect();
  const navigate = useNavigate();

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

export default ConfirmDeleteMatch;
