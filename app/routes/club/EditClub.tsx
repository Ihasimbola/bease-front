import React, { useEffect, useState } from "react";
import AppText from "~/components/general/AppText/AppText";
import Icon from "~/components/icon";
import { Input } from "~/components/ui/input";
import "./styles.css";
import { PlusIcon, Trash2Icon } from "lucide-react";
import AppButton from "~/components/general/AppButton/AppButton";
import { ClubService } from "~/services/ClubService";
import { CategoryService } from "~/services/CategoryService";
import type { Route } from "./+types/EditClub";
import placeholderImage from "~/assets/images/placeholder_image.png";
import { Form, Outlet, useNavigate } from "react-router";
import { FileService } from "~/services/fileService";
import { toast } from "sonner";

const ApiBaseUrl = import.meta.env.VITE_API_URL;

export async function clientLoader() {
  try {
    const club = await ClubService.getClub();
    const categories = await CategoryService.getCategories();
    return {
      data: { club: club.data, categories: categories.data },
      message: "",
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error,
      message: "Une erreur est survenue",
    };
  }
}

export async function clientAction({ request, params }: Route.ActionArgs) {
  const formData = await request.formData();
  const clubId = params.id;
  const name = formData.get("name");
  const data = {} as { name?: string; emblem?: string };

  // procession the file emblem
  const emblemFormData = new FormData();
  if (formData.get("emblem") !== null) {
    emblemFormData.append("emblem", formData.get("emblem")!);
    const res = await FileService.upload("club/emblem", emblemFormData);
    data.emblem = res.data._id;
  }

  if (name) {
    data.name = name.toString();
  }

  const res = await ClubService.updateClub(clubId, data);
  window.location.reload();
  return res;
}

function EditClub({ loaderData, actionData }: Route.ComponentProps) {
  const club = loaderData.data?.club;
  const categories = loaderData.data?.categories;
  const data = actionData;
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [emblem, setEmblem] = useState<any>();
  const [changeEmblem, setChangeEmblem] = useState(false);

  const navigate = useNavigate();

  const handleClickUploadEmblem = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSelectImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = URL.createObjectURL(e.target.files![0]);
    setEmblem(file);
    setChangeEmblem(true);
  };

  useEffect(() => {
    if (loaderData?.message) {
      toast.error(loaderData?.message);
    }
  }, [loaderData?.message]);

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
        <Form
          className="mt-6 bg-white p-4 rounded-[20px] logo-container relative max-h-fit"
          method="PATCH"
          encType="multipart/form-data"
        >
          <Input
            type="text"
            defaultValue={club.name}
            name="name"
            readOnly={false}
            className="mb-5"
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
            name={changeEmblem ? "emblem" : ""}
            ref={fileInputRef}
            className="hidden"
            onChange={handleSelectImage}
          />
          {/* {changeEmblem && (
            <AppButton className="m-auto mt-2" type="submit">
              Sauvegarder
            </AppButton>
          )} */}
          <AppButton className="m-auto mt-2" type="submit">
            Sauvegarder
          </AppButton>
        </Form>

        <div className="mt-6 bg-white p-4 rounded-[20px] flex-1">
          <AppText as="h3" weight="semibold">
            Vos Equipes
          </AppText>
          <ul className="flex flex-col gap-1 mt-2 ml-2 category-list">
            {club.categories.map(
              (
                subTeam: { name: string; isCustom: boolean; _id: string },
                idx: number
              ) => (
                <li
                  key={`category-${idx}`}
                  className="p-2 cursor-pointer flex justify-between"
                >
                  <AppText color="gray" size="xs">
                    {subTeam.name}
                  </AppText>
                  {subTeam.isCustom && (
                    <div
                      className=""
                      onClick={() => {
                        navigate("destroy-subteam?subteam=" + subTeam._id);
                      }}
                      id={subTeam.name}
                    >
                      <Trash2Icon
                        className="stroke-red hover:brightness-110"
                        size={20}
                      />
                    </div>
                  )}
                </li>
              )
            )}
          </ul>
          <AppButton
            className=" mt-4"
            onClick={() => navigate("create-subteam")}
          >
            <PlusIcon color="white" />
            Ajouter une équipe
          </AppButton>
        </div>
      </div>
      <Outlet />
    </section>
  );
}

export default EditClub;
