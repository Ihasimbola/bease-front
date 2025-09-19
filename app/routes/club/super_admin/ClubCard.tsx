import useSWR from "swr";
import AppText from "~/components/general/AppText/AppText";
import { ClubService } from "~/services/ClubService";
import type { ClubDataType } from "./types";
import profile_placeholder from "~/assets/images/profile_placeholder.jpg";

interface Props {
  club: ClubDataType;
  className?: string;
}

const apiBaseUrl = import.meta.env.VITE_API_URL;

const fetcher = (id: string): Promise<ClubDataType[]> => {
  return ClubService.getClub(id);
};

function ClubCard(props: Props) {
  const { club, className } = props;

  const {
    isLoading,
    error,
    data: clubs,
  } = useSWR(`${club._id}`, fetcher, {
    suspense: true,
    refreshInterval: 1000 * 60 * 60,
  });

  const clubAdminProfilImg = club?.profileAdmin?.user?.profile
    ? `${apiBaseUrl}files/image/${club?.profileAdmin?.user?.profile}`
    : profile_placeholder;

  return (
    <>
      <div
        key={`club-${club._id}`}
        className="flex flex-col gap-5 min-w-[320px] items-center cursor-pointer"
      >
        <div className="flex self-start items-center gap-3">
          <img
            src={clubAdminProfilImg}
            alt="profil_admin"
            loading="lazy"
            className="w-[40px] h-[40px] rounded-[50%]"
          />
          <AppText
            size="sm"
            weight="light"
          >{`${club.profileAdmin.user.firstname} ${club.profileAdmin.user.lastname}`}</AppText>
        </div>
        <img
          src={import.meta.env.VITE_API_URL + `files/image/${club.emblem}`}
          alt="emblem"
          loading="lazy"
          className="w-[250px] h-[250px]"
        />
        <AppText weight="bold" size="lg">
          {club.name}
        </AppText>
      </div>
    </>
  );
}

export default ClubCard;
