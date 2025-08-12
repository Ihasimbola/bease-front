import React from "react";
import AppText from "~/components/general/AppText/AppText";
import Icon from "~/components/icon";
import { Input } from "~/components/ui/input";
import clubLogo from "~/assets/images/club_logo.png";
import { clubData } from "./data";
import "./styles.css";
import { PlusIcon, SaveAllIcon, SaveIcon, Trash2Icon } from "lucide-react";
import AppButton from "~/components/general/AppButton/AppButton";
import Dialog from "~/components/common/dialog/Dialog";

type Props = {};

function EditClub({}: Props) {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [emblem, setEmblem] = React.useState<any>();
  const [isOpenCategoryDialog, setIsOpen] = React.useState(false);
  const [isOpenSubclubDialog, setIsOpenSubclubDialog] = React.useState(false);

  const handleClickUploadEmblem = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSelectImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = URL.createObjectURL(e.target.files![0]);
    setEmblem(file);
  };

  return (
    <section className="club edit">
      <Dialog
        className="flex flex-col"
        close={isOpenCategoryDialog}
        setIsOpen={setIsOpen}
      >
        <AppText color="black" weight="bold" as="h1">
          Creation de categorie
        </AppText>
        <div className="mt-6">
          <label htmlFor="category">
            <AppText color="black">Nom de la categorie</AppText>
          </label>
          <Input type="text" id="category" placeholder="U17" className="mt-2" />
        </div>
        <div className="flex gap-6 mt-4">
          <AppButton>
            <PlusIcon />
            Ajouter
          </AppButton>
          <AppButton onClick={() => setIsOpen(false)}>Annuler</AppButton>
        </div>
      </Dialog>

      <Dialog
        className="flex flex-col"
        close={isOpenSubclubDialog}
        setIsOpen={setIsOpenSubclubDialog}
      >
        <AppText color="black" weight="bold" as="h1">
          Creation de sous-club
        </AppText>
        <div className="mt-6">
          <label htmlFor="category">
            <AppText color="black">Nom du sous-club</AppText>
          </label>
          <Input
            type="text"
            id="category"
            placeholder="Kunheim-1"
            className="mt-2"
          />
        </div>
        <div className="flex gap-6 mt-4">
          <AppButton>
            <PlusIcon />
            Ajouter
          </AppButton>
          <AppButton onClick={() => setIsOpenSubclubDialog(false)}>
            Annuler
          </AppButton>
        </div>
      </Dialog>
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
          <Input type="text" value="FCSL EGUISHEIM" name="name" />
          <img
            src={emblem || clubLogo}
            alt="logo_club"
            width="350px"
            height="450px"
            className="mt-4 mb-4 justify-self-center"
          />
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
            {clubData.categories.map((category, idx) => (
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
          <AppButton className=" mt-4" onClick={() => setIsOpen(true)}>
            <PlusIcon color="white" />
            Ajouter une catégorie
          </AppButton>
        </div>

        <div className="mt-6 bg-white p-4 rounded-[20px] flex-1">
          <AppText as="h3" weight="semibold">
            Vos sous-clubs
          </AppText>
          <ul className="flex flex-col gap-1 mt-2 ml-2 category-list">
            {clubData.subTeam.map((subTeam, idx) => (
              <li
                key={`category-${idx}`}
                className="p-2 cursor-pointer flex justify-between"
              >
                <AppText color="gray" size="xs">
                  {subTeam.name}
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
            onClick={() => setIsOpenSubclubDialog(true)}
          >
            <PlusIcon color="white" />
            Ajouter un sous-club
          </AppButton>
        </div>
      </div>
    </section>
  );
}

export default EditClub;
