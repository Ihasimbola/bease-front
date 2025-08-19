import AppButton from "~/components/general/AppButton/AppButton";
import AppText from "~/components/general/AppText/AppText";
import placeholderImage from "~/assets/images/placeholder_image.png";
import "./styles.css";
import { useNavigate } from "react-router";
import { ClubService } from "~/services/ClubService";
import type { Route } from "./+types/Club";
import { LoaderCircle } from "lucide-react";
import { CategoryService } from "~/services/CategoryService";

const ApiBaseUrl = import.meta.env.VITE_API_URL;

type Props = {};

export async function clientLoader() {
  try {
    const club = await ClubService.getClub();
    const categories = await CategoryService.getCategories();
    return { club: club.data, categories: categories.data };
  } catch (error) {
    throw error;
  }
}

// HydrateFallback is rendered while the client loader is running
export function HydrateFallback() {
  return (
    <div>
      <div>
        <AppText weight="bold" size="2xl" as="h1">
          Votre Club
        </AppText>
        <AppText size="xs" color="gray" as="h2">
          Les informations concernant votre club
        </AppText>
      </div>

      <LoaderCircle
        color="#000"
        size={40}
        strokeWidth={2}
        className="animate-spin mt-8"
      />
    </div>
  );
}

function Club({ loaderData }: Route.ComponentProps) {
  const { club, categories } = loaderData;
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
          {!!!club && (
            <AppButton onClick={() => navigate("/club/create")}>
              Créer mon Club
            </AppButton>
          )}
          {club && (
            <AppButton onClick={() => navigate("/club/edit/" + club._id)}>
              Editer mon Club
            </AppButton>
          )}
        </div>
      </div>

      {club && (
        <div className="xl:flex gap-10">
          <div className="mt-6 bg-white p-4 rounded-[20px] ">
            <AppText weight="semibold">{club.name}</AppText>
            {club.emblem ? (
              <img
                src={`${ApiBaseUrl}files/image/${club.emblem}`}
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
          </div>

          <div className="mt-6 bg-white p-4 rounded-[20px] flex-1">
            <AppText as="h3" weight="semibold">
              Vos Equipes
            </AppText>
            <ul className="flex flex-col gap-1 mt-2 ml-2 category-list">
              {club.categories.map(
                (category: { name: string }, idx: number) => (
                  <li key={`category-${idx}`} className="p-2 cursor-pointer">
                    <AppText color="gray" size="xs">
                      {category.name}
                    </AppText>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      )}
    </section>
  );
}

export default Club;
