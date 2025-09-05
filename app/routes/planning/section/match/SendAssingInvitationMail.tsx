import { useEffect } from "react";
import { data, redirect, useNavigate } from "react-router";
import Dialog from "~/components/common/dialog/Dialog";
import AppButton from "~/components/general/AppButton/AppButton";
import AppText from "~/components/general/AppText/AppText";
import { useDialog } from "~/hooks/useDialog";
import type { Route } from "./+types/SendAssingInvitationMail";
import { useFetcherEffect } from "~/hooks/useFetcherEffect";
import { MatchService } from "~/services/MatchService";
import { toast } from "sonner";
import { CategoryService } from "~/services/CategoryService";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { LoaderCircle } from "lucide-react";

export async function clientAction({ request }: Route.ClientActionArgs) {
  const url = new URL(request.url);
  const matchId = new URLSearchParams(url.search).get("match");
  const formData = await request.formData();
  const categoryId = formData.get("categories")?.toString();

  if (!matchId) {
    return redirect("/planning");
  }

  if (!categoryId) {
    return redirect("/planning");
  }

  try {
    const res = await MatchService.sendAssignForMatchFromInvitation({
      matchId,
      categoryId,
    });
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

export async function clientLoader({ request }: Route.ClientLoaderArgs) {
  const url = new URL(request.url);
  const matchId = new URLSearchParams(url.search).get("match");

  if (!matchId) {
    return redirect("/planning");
  }

  try {
    const { data: match }: any = await MatchService.getMatchById(matchId);

    if (!match) {
      return {
        message: "Match introuvable",
        data: null,
        error: null,
      };
    }

    const categories = await CategoryService.getCategoriesByClub(match.clubId);

    return {
      data: {
        match,
        categories,
      },
      message: "",
      error: null,
    };
  } catch (error: any) {
    return {
      message: error?.response?.data?.message || "Une erreur est survenue",
      error,
      data: null,
    };
  }
}

function SendAssignInvitationMail({ loaderData }: Route.ComponentProps) {
  const { isOpen, setIsOpen } = useDialog();
  const { fetcher } = useFetcherEffect();
  const navigate = useNavigate();
  const match = loaderData.data?.match;
  const { data: categories } = loaderData.data?.categories as any;

  useEffect(() => {
    if (loaderData.message) {
      toast.error(loaderData.message);
    }
  }, [loaderData.message]);

  return (
    <Dialog setIsOpen={setIsOpen} close={isOpen}>
      <AppText weight="bold">Envoyer d' invitation</AppText>
      <div className="pl-3 mt-4">
        <AppText weight="normal" size="sm">
          Envoyer un mail d' invitation
        </AppText>
        <AppText size="sm"> aux categories du club pour le match du</AppText>
        <AppText weight="bold" size="sm">
          {new Date(match?.matchDate).toLocaleDateString("fr-FR", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </AppText>
      </div>
      <div className="flex gap-3 mt-4">
        <fetcher.Form method="POST">
          <label htmlFor="categories">
            <AppText size="sm" weight="semibold">
              Selectionner une catégorie
            </AppText>
          </label>
          <Select name="categories">
            <SelectTrigger id="categories">
              <SelectValue placeholder="Catégories" />
            </SelectTrigger>
            <SelectContent className="relative z-[1300]">
              <SelectGroup className="relative z-[1300] bg-white">
                {categories?.map(
                  (category: { name: string; _id: string }, idx: number) => (
                    <SelectItem value={category._id} key={`category-${idx}`}>
                      {category.name}
                    </SelectItem>
                  )
                )}
              </SelectGroup>
            </SelectContent>
          </Select>
          <div className="flex gap-3 mt-5">
            <AppButton type="submit" className="flex-1">
              {fetcher.state !== "idle" ? (
                <LoaderCircle
                  className="animate-spin loader-circle"
                  id="loader-circle"
                  stroke="stroke-white"
                />
              ) : (
                "Envoyer"
              )}
            </AppButton>
            <AppButton
              variant="outlined"
              className="flex-1"
              type="button"
              onClick={() => navigate(-1)}
            >
              Annuler
            </AppButton>
          </div>
        </fetcher.Form>
      </div>
    </Dialog>
  );
}

export default SendAssignInvitationMail;
