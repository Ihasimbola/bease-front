import React from "react";
import AppButton from "~/components/general/AppButton/AppButton";
import AppText from "~/components/general/AppText/AppText";
import clubLogo from "~/assets/images/club_logo.png";
import { clubData } from "./data";
import "./styles.css";
import { useNavigate } from "react-router";

type Props = {};

function Club({}: Props) {
  const navigate = useNavigate();

  return (
    <section className="club">
      <div className="flex flex-col gap-2 xl:flex-row xl:justify-between">
        <div>
          <AppText weight="bold" size="2xl" as="h1">
            Votre Club
          </AppText>
          <AppText size="xs" color="gray" as="h2">
            Les informations concernant votre club
          </AppText>
        </div>
        <div className="mt-6 flex gap-4">
          <AppButton onClick={() => navigate("/club/create")}>
            Créer mon Club
          </AppButton>
          <AppButton onClick={() => navigate("/club/edit/1234568")}>
            Editer mon Club
          </AppButton>
        </div>
      </div>

      <div className="xl:flex gap-10">
        <div className="mt-6 bg-white p-4 rounded-[20px] ">
          <AppText weight="semibold">FCSL EGUISHEIM</AppText>
          <img src={clubLogo} alt="logo_club" className="justify-self-center" />
        </div>
        <div className="mt-6 bg-white p-4 rounded-[20px] flex-1">
          <AppText as="h3" weight="semibold">
            Vos catégories
          </AppText>
          <ul className="flex flex-col gap-1 mt-2 ml-2 category-list">
            {clubData.categories.map((category, idx) => (
              <li key={`category-${idx}`} className="p-2 cursor-pointer">
                <AppText color="gray" size="xs">
                  {category.name}
                </AppText>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 bg-white p-4 rounded-[20px] flex-1">
          <AppText as="h3" weight="semibold">
            Vos sous-clubs
          </AppText>
          <ul className="flex flex-col gap-1 mt-2 ml-2 category-list">
            {clubData.subTeam.map((subTeam, idx) => (
              <li key={`category-${idx}`} className="p-2 cursor-pointer">
                <AppText color="gray" size="xs">
                  {subTeam.name}
                </AppText>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Club;
