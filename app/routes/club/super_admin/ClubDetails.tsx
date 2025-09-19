import type { Route } from "../super_admin/+types/ClubDetails";
import { ClubService } from "~/services/ClubService";
import { UserService } from "~/services/userService";
import { CategoryService } from "~/services/CategoryService";
import AppText from "~/components/general/AppText/AppText";
import profile_placeholder from "~/assets/images/profile_placeholder.jpg";
import img_placeholder from "~/assets/images/placeholder_image.png";
import { Link } from "react-router";

const apiBaseUrl = import.meta.env.VITE_API_URL;

export async function clientLoader({
  request,
  params,
}: Route.ClientLoaderArgs) {
  const clubId = params.id;

  try {
    const club = await ClubService.getClub(clubId);
    const admin = await UserService.getAdmin(club?.profileAdmin);
    let categories = [];
    for (let i = 0; i < club?.categories.length; ++i) {
      const res = await CategoryService.getCategory(club?.categories[i]);
      categories.push(res.data);
    }

    return {
      data: {
        club,
        categories,
        admin,
      },
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

function ClubDetails({ loaderData }: Route.ComponentProps) {
  const club = loaderData?.data?.club;
  const categories = loaderData?.data?.categories;
  const admin = loaderData?.data?.admin;
  console.log(categories);

  const clubAdminProfilImg = admin?.user?.profile
    ? `${apiBaseUrl}files/image/${admin?.user?.profile}`
    : profile_placeholder;

  const emblemImg = club?.emblem
    ? `${apiBaseUrl}files/image/${club?.emblem}`
    : img_placeholder;

  return (
    <section className="flex flex-wrap gap-6 mt-6 p-6 bg-white rounded-[20px]">
      <div className="bg-gray-100/35 p-6 rounded-[20px] w-fit min-w-[300px]">
        <AppText weight="bold" className="underline">
          Administrateur du Club
        </AppText>
        <div className="flex flex-col gap-3 justify-between mt-3">
          <div className="flex gap-2 items-center">
            <img
              src={clubAdminProfilImg}
              alt="profil_admin"
              loading="lazy"
              className="w-[40px] h-[40px] rounded-[50%]"
            />
            <AppText>{`${admin?.user?.firstname} ${admin?.user?.lastname}`}</AppText>
          </div>
          <Link to="#">
            <AppText className="underline text-blue-500 cursor-pointer">{`${admin?.user?.email}`}</AppText>
          </Link>
          <AppText>{`${admin?.phone}`}</AppText>
        </div>
      </div>

      <div className="bg-gray-100/35 p-6 rounded-[20px] w-fit min-w-[300px]">
        <AppText weight="bold" className="underline">
          Le Club
        </AppText>
        <div className="flex flex-col gap-3 items-center mt-3">
          <img
            src={emblemImg}
            alt="emblem"
            className="w-[250px] h-[250px]"
            loading="lazy"
          />
          <AppText weight="bold">{`${club?.name}`}</AppText>
        </div>
      </div>

      <div className="bg-gray-100/35 p-6 rounded-[20px] w-fit min-w-[300px]">
        <AppText weight="bold" className="underline">
          Les catégories
        </AppText>
        <div className="flex flex-col gap-3 mt-3">
          {categories?.map((category: { _id: string; name: string }) => (
            <AppText key={category._id}>{`${category.name}`}</AppText>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ClubDetails;
