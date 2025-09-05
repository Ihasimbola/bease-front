import { LoaderCircle, Send } from "lucide-react";
import React, { useEffect } from "react";
import { redirect, useFetcher, useNavigate } from "react-router";
import Dialog from "~/components/common/dialog/Dialog";
import AppButton from "~/components/general/AppButton/AppButton";
import AppText from "~/components/general/AppText/AppText";
import { Input } from "~/components/ui/input";
import type { Route } from "./+types/AddMemberDialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectValue,
  SelectTrigger,
} from "~/components/ui/select";
import { ClubService } from "~/services/ClubService";
import { CategoryService } from "~/services/CategoryService";
import type { CategoryResponse, ClubResponse } from "~/services/type";
import { MailingService } from "~/services/MailingService";
import { toast } from "sonner";
import { useFetcherEffect } from "~/hooks/useFetcherEffect";

interface Props {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

type InvitationData = {
  email: string;
  club: string;
  categoryId?: string;
};

export async function clientAction({ request }: Route.ClientActionArgs) {
  const formData = await request.formData();
  const club = JSON.parse(localStorage.getItem("user")!).club;
  if (!club) {
    return;
  }

  const data = {} as any;
  for (let [key, value] of formData.entries()) {
    data[key] = value;
  }

  if (!data.email) {
    return redirect("/membre");
  }

  try {
    const res = await MailingService.sendInvitationMail(
      data.email,
      club,
      data.category
    );

    return redirect("/membre");
  } catch (error: any) {
    return {
      message: error?.response?.data?.message || "Une erreur est survenue",
      data: null,
      error,
    };
  }
}

export async function clientLoader() {
  const club = JSON.parse(localStorage.getItem("user")!)?.club;
  if (!club)
    return { club: null, message: "Vous n' avez pas encore créé un club" };

  try {
    // get admin club
    const adminClub: ClubResponse = (await ClubService.getClub(club)) as any;

    // get all categories
    const categoriesId = adminClub.categories as string[];
    const categories = [] as CategoryResponse[];
    for (let i = 0; i < categoriesId.length; ++i) {
      categories[i] = (await CategoryService.getCategory(categoriesId[i])).data;
    }

    return {
      club: club,
      message: "",
      categories: categories,
    };
  } catch (error: any) {
    return {
      club: null,
      message: error.data.message,
      categories: [],
    };
  }
}

function AddMemberDialog({ loaderData }: Route.ComponentProps) {
  const [isOpen, setIsOpen] = React.useState(true);
  const navigate = useNavigate();
  const { fetcher } = useFetcherEffect();
  const categories = loaderData?.categories;

  useEffect(() => {
    if (loaderData?.message) {
      toast.error(loaderData?.message);
    }
  }, [loaderData?.message]);

  // pop back to the previous page
  useEffect(() => {
    if (!isOpen) navigate(-1);
  }, [isOpen]);

  return (
    <Dialog setIsOpen={setIsOpen} close={isOpen}>
      <AppText weight="bold">Ajout d' un membre</AppText>
      <fetcher.Form method="post">
        <div className="mt-4">
          <label htmlFor="email">
            <AppText size="sm" weight="semibold">
              Email du nouveau membre
            </AppText>
          </label>
          <Input
            type="text"
            id="email"
            placeholder="john@gmail.com"
            className="mt-1"
            name="email"
            required
          />
        </div>

        <div className="mt-4">
          <label htmlFor="category">
            <AppText size="sm" weight="semibold">
              Sa categorie
            </AppText>
          </label>
          <Select name="category" required>
            <SelectTrigger className="bg-white">
              <SelectValue placeholder="Selectionner une categorie" />
            </SelectTrigger>
            <SelectContent className="relative z-[1300]" id="category">
              <SelectGroup className="bg-white relative z-[1300]">
                {categories?.map((category, idx) => (
                  <SelectItem
                    key={`category-${idx}`}
                    value={category?._id}
                    className=""
                  >
                    {category.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-3 mt-4">
          <AppButton>
            {fetcher.state !== "idle" ? (
              <LoaderCircle
                className="loader-circle"
                id="loader-circle"
                stroke="stroke-white"
              />
            ) : (
              <>
                <Send size={16} />
                Envoyer la demande
              </>
            )}
          </AppButton>
          <AppButton
            variant="outlined"
            type="button"
            onClick={() => navigate(-1)}
          >
            Annuler
          </AppButton>
        </div>
      </fetcher.Form>
    </Dialog>
  );
}

export default AddMemberDialog;
