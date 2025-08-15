import React, { useEffect, useState } from "react";
import AppText from "~/components/general/AppText/AppText";
import Icon from "~/components/icon";
import { Input } from "~/components/ui/input";
import clubLogo from "~/assets/images/club_logo.png";
import { clubData } from "./data";
import "./styles.css";
import { PlusIcon, Trash2Icon } from "lucide-react";
import AppButton from "~/components/general/AppButton/AppButton";
import Dialog from "~/components/common/dialog/Dialog";
import { ClubService } from "~/services/ClubService";
import { CategoryService } from "~/services/CategoryService";
import type { Route } from "./+types/EditClub";
import placeholderImage from "~/assets/images/placeholder_image.png";
import { Form, Outlet, useNavigate, useSearchParams } from "react-router";
import ConfirmationDialog from "~/components/common/ConfirmationDialog";

const ApiBaseUrl = import.meta.env.VITE_API_URL;

export async function clientLoader() {
  try {
    const club = await ClubService.getClub();
    const categories = await CategoryService.getCategories();
    return { club: club.data, categories: categories.data };
  } catch (error) {
    throw error;
  }
}

function EditClub({ loaderData }: Route.ComponentProps) {
  const { club, categories } = loaderData;
  console.log(club);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [emblem, setEmblem] = React.useState<any>();
  const [isOpenConfirmationDialog, setIsOpenConfirmationDialog] =
    React.useState(false);
  const [isDeleteConfirmed, setIsDeleteConfirmed] = React.useState(false);
  const [subteamToDelete, setIsSubteamToDelete] = useState<{ name: string }>();
  const [searchParam, setSearchParam] = useSearchParams("");

  const navigate = useNavigate();

  const handleClickUploadEmblem = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSelectImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = URL.createObjectURL(e.target.files![0]);
    setEmblem(file);
  };

  useEffect(() => {
    if (!isDeleteConfirmed) {
      return;
    }
    setSearchParam("?subteam=" + subteamToDelete?.name);
  }, [isDeleteConfirmed]);

  return (
    <section className="club edit">
      <div className="flex flex-col gap-2 xl:flex-row xl:justify-between">
        <div>
          <AppText weight="bold" size="2xl" as="h1">
            Editer votre Club
          </AppText>
          <AppText size="xs" color="gray" as="h2">
            Modifier les information concerant votre club
          </AppText>
        </div>
      </div>

      <div className="xl:flex gap-10">
        <div className="mt-6 bg-white p-4 rounded-[20px] logo-container relative">
          <Input
            type="text"
            defaultValue={club.name}
            name="name"
            readOnly={false}
          />
          {club.emblem ? (
            <img
              src={emblem || `${ApiBaseUrl}files/image/${club.emblem}`}
              alt="emblem"
              className="mt-2"
              width="250px"
              height="auto"
            />
          ) : (
            <img
              src={placeholderImage}
              alt="emblem"
              className="mt-2"
              width="250px"
              height="auto"
            />
          )}

          <div
            className="absolute bottom-[50px] right-[10px] cursor-pointer"
            onClick={handleClickUploadEmblem}
          >
            <Icon name="UploadImgIcon" />
          </div>
          <input
            type="file"
            name="emblem"
            ref={fileInputRef}
            className="hidden"
            onChange={handleSelectImage}
          />
          <AppButton className="m-auto mt-2">Sauvegarder</AppButton>
        </div>
        <div className="mt-6 bg-white p-4 rounded-[20px] flex-1">
          <AppText as="h3" weight="semibold">
            Vos catégories
          </AppText>
          <ul className="flex flex-col gap-1 mt-2 ml-2 category-list">
            {categories.map((category: { name: string }, idx: number) => (
              <li
                key={`category-${idx}`}
                className="p-2 cursor-pointer flex justify-between"
              >
                <AppText color="gray" size="xs">
                  {category.name}
                </AppText>
                <div className="">
                  <Trash2Icon
                    className="stroke-red hover:brightness-110"
                    size={20}
                  />
                </div>
              </li>
            ))}
          </ul>
          <AppButton
            className=" mt-4"
            onClick={() => navigate("create-category")}
          >
            <PlusIcon color="white" />
            Ajouter une catégorie
          </AppButton>
        </div>

        <div className="mt-6 bg-white p-4 rounded-[20px] flex-1">
          <AppText as="h3" weight="semibold">
            Vos sous-clubs
          </AppText>
          <ul className="flex flex-col gap-1 mt-2 ml-2 category-list">
            {club.subteamNames.map((subTeam: string, idx: number) => (
              <li
                key={`category-${idx}`}
                className="p-2 cursor-pointer flex justify-between"
              >
                <AppText color="gray" size="xs">
                  {subTeam}
                </AppText>
                <div
                  className=""
                  onClick={() => {
                    setIsOpenConfirmationDialog(true);
                    setIsSubteamToDelete({ name: subTeam });
                    navigate("destroy-subteam?subteam=" + subTeam);
                  }}
                  id={subTeam}
                >
                  <Trash2Icon
                    className="stroke-red hover:brightness-110"
                    size={20}
                  />
                </div>
              </li>
            ))}
          </ul>
          <AppButton
            className=" mt-4"
            onClick={() => navigate("create-subteam")}
          >
            <PlusIcon color="white" />
            Ajouter un sous-club
          </AppButton>
        </div>
      </div>
      {/* <ConfirmationDialog
        isOpen={isOpenConfirmationDialog}
        setIsOpen={setIsOpenConfirmationDialog}
        setIsDeleteConfirmed={setIsDeleteConfirmed}
      /> */}
      <Outlet />
    </section>
  );
}

export default EditClub;
