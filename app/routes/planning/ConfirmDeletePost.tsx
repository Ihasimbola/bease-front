import React, { useEffect, useState } from "react";
import { Form, redirect, useNavigate } from "react-router";
import Dialog from "~/components/common/dialog/Dialog";
import AppButton from "~/components/general/AppButton/AppButton";
import AppText from "~/components/general/AppText/AppText";
import { useDialog } from "~/hooks/useDialog";
import type { Route } from "./+types/ConfirmDeletePost";
import { PostService } from "~/services/PostService";

type Props = {};

export async function clientAction({ request }: Route.ClientActionArgs) {
  console.log("called");
  const url = new URL(request.url);
  const postId = new URLSearchParams(url.search).get("id");

  if (!postId) {
    return redirect("/planning");
  }

  try {
    const res = await PostService.deletePost(postId!);
    return redirect("/planning");
  } catch (error) {
    return redirect("/planning");
  }
}

function ConfirmDeletePost({}: Props) {
  const { isOpen, setIsOpen } = useDialog();

  return (
    <Dialog setIsOpen={setIsOpen} close={isOpen}>
      <AppText weight="bold">Êtes-vous sûre de vouloir supprimer?</AppText>
      <div className="flex gap-3 mt-4">
        <Form method="DELETE">
          <AppButton type="submit">Confirmer</AppButton>
        </Form>
        <AppButton
          variant="outlined"
          type="button"
          onClick={() => setIsOpen(false)}
        >
          Annuler
        </AppButton>
      </div>
    </Dialog>
  );
}

export default ConfirmDeletePost;
