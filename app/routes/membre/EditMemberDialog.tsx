import React, { useEffect, useState } from "react";
import {
  data,
  redirect,
  useFetcher,
  useNavigate,
  useNavigation,
} from "react-router";
import Dialog from "~/components/common/dialog/Dialog";
import AppButton from "~/components/general/AppButton/AppButton";
import AppText from "~/components/general/AppText/AppText";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import type { Route } from "./+types/EditMemberDialog";
import { CategoryService } from "~/services/CategoryService";
import { ClubService } from "~/services/ClubService";
import type { CategoryResponse } from "~/services/type";
import { toast } from "sonner";
import { UserService } from "~/services/userService";
import { LoaderCircle } from "lucide-react";

const categories = [
  {
    id: 0,
    name: "Senior",
  },
  {
    id: 1,
    name: "Junior",
  },
  {
    id: 2,
    name: "U20",
  },
  {
    id: 3,
    name: "U16",
  },
  {
    id: "4",
    name: "U14",
  },
];

interface Props {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export async function clientAction({
  params,
  request,
}: Route.ClientActionArgs) {
  const formData = await request.formData();
  const category = formData.get("category");
  if (!category) {
    return redirect("/membre");
  }

  try {
    const res = await UserService.updateLicensed(params.id, {
      category: category.toString(),
    });
    return redirect("/membre");
  } catch (error: any) {
    return data({
      message: error?.response?.data?.message || "Une erreur est survenue",
      data: null,
      error,
    });
  }
}

export async function clientLoader({
  params,
  request,
}: Route.ClientLoaderArgs) {
  const url = new URL(request.url);
  const searachParam = new URLSearchParams(url.search);
  const licensedDefaultCategory = String(searachParam.get("category"));

  const clubId = JSON.parse(localStorage.getItem("user")!).club;
  if (!clubId) {
    return {
      categories: [],
      message: "Vous n' avez pas encore créé un club",
    };
  }

  try {
    const club = await ClubService.getClub(clubId);

    const categoriesId = club.categories as string[];
    const categories = [] as CategoryResponse[];
    for (let i = 0; i < categoriesId.length; ++i) {
      categories[i] = (await CategoryService.getCategory(categoriesId[i])).data;
    }

    // get the default category
    const defaultCategory = categories.find((category) => {
      return category.name === licensedDefaultCategory;
    });

    return {
      message: "",
      data: {
        categories,
        defaultCategory: defaultCategory?._id,
      },
      error: null,
    };
  } catch (error) {
    return {
      error,
      message: "Une erreur est survenue",
      data: null,
    };
  }
}

const EditMemberDialog = ({ loaderData, actionData }: Route.ComponentProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();
  const fetcher = useFetcher();
  const navigation = useNavigation();
  const message = loaderData.message;
  const categories = loaderData.data?.categories;
  const defaultCategory = loaderData.data?.defaultCategory;

  useEffect(() => {
    if (actionData?.message) {
      toast.error(message);
    }
  }, [actionData?.message]);

  useEffect(() => {
    if (!isOpen) navigate(-1);
  }, [isOpen]);

  useEffect(() => {
    if (message) toast.error(message);
  }, [loaderData.message]);

  return (
    <Dialog setIsOpen={setIsOpen} close={isOpen}>
      <AppText as="h1" weight="bold">
        Assigner à une catégorie
      </AppText>
      <fetcher.Form method="POST">
        <div className="mt-4">
          <Select name="category" defaultValue={defaultCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Selectionner une catégorie" />
            </SelectTrigger>
            <SelectContent className="relative z-[1200]">
              {categories?.map((category, idx) => (
                <SelectItem key={`category-${idx}`} value={category._id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-3 mt-4">
          <AppButton type="submit">
            {fetcher.state !== "idle" ? (
              <LoaderCircle
                className="loader-circle"
                id="loader-circle"
                stroke="stroke-white"
              />
            ) : (
              "Assigner"
            )}
          </AppButton>
          <AppButton
            type="button"
            variant="outlined"
            onClick={() => navigate(-1)}
          >
            Annuler
          </AppButton>
        </div>
      </fetcher.Form>
    </Dialog>
  );
};

export default EditMemberDialog;
