import { PlusIcon, SearchIcon, Upload } from "lucide-react";
import { useLayoutEffect } from "react";
import AppButton from "~/components/general/AppButton/AppButton";
import AppText from "~/components/general/AppText/AppText";
import { Input } from "~/components/ui/input";
import Table from "./Table";
import type { Route } from "./+types/Membre";
import { Outlet, useNavigate } from "react-router";
import { UserService, type LicensedResponse } from "~/services/userService";
import { tableHeader } from "./tableData";
import type { TableData } from "./type";
import { toast } from "sonner";

export async function clientLoader() {
  const clubId = JSON.parse(localStorage.getItem("user")!)?.club;
  if (!clubId) {
    return {
      membres: [],
      message: "Vous n' avez pas encore créé un club",
    };
  }

  try {
    const { data: membres } = await UserService.getLicensedByClub(clubId);

    const data: TableData[] = membres.map((membre: LicensedResponse) => ({
      firstname: membre?.user?.firstname,
      lastname: membre?.user?.lastname,
      age: membre?.age,
      category: membre?.category?.name || "-",
      isConfirmed: membre?.isConfirmed,
      gender: membre?.gender,
      _id: membre?._id,
    }));
    return {
      data,
      error: null,
      message: "",
    };
  } catch (error) {
    return {
      message: "Une erreur est survenue",
      error,
      data: null,
    };
  }
}

export function HydrateFallback() {
  return <div>Loading data...</div>;
}

function Membre({ loaderData }: Route.ComponentProps) {
  const navigate = useNavigate();
  const { data: membres, message } = loaderData;

  useLayoutEffect(() => {
    if (message) {
      toast.error(message);
      navigate("/club");
    }
  }, [loaderData]);

  const handleOnDelete = (id: string | number) => {
    navigate("delete-member" + `/${id}`);
  };

  const handleOnEdit = (id: string | number, category: string) => {
    navigate("edit-member" + `/${id}?category=${category}`);
  };

  return (
    <section>
      <div className="lg:flex justify-between items-end">
        <div className="mb-4 flex flex-col gap-1">
          <AppText as="h1" weight="bold" size="2xl">
            Les membres
          </AppText>
          <AppText size="xs" color="gray">
            Les informations concernants les membres de votre club
          </AppText>
        </div>
        <div className="flex gap-4">
          <AppButton
            onClick={() => {
              navigate("import-excel");
            }}
          >
            <Upload size={16} />
            <AppText color="white" size="xs">
              Importer un ficher excel
            </AppText>
          </AppButton>
          <AppButton onClick={() => navigate("add-member")}>
            <PlusIcon size={16} />
            <AppText color="white" size="xs">
              Ajouter un membre
            </AppText>
          </AppButton>
        </div>
      </div>

      <div className="relative mt-6">
        <Input
          type="text"
          placeholder="Rechercher un membre..."
          className="text-xs rounded-[20px] pl-8 max-w-[450px] bg-white"
        />
        <div className="absolute top-2.5 left-2">
          <SearchIcon color="gray" size={16} />
        </div>
      </div>
      {membres?.length && membres !== null && membres !== undefined ? (
        <Table
          className="mt-8"
          onClickTrash={handleOnDelete}
          onClickEdit={handleOnEdit}
          tableHeader={tableHeader}
          tableData={membres}
        />
      ) : (
        <div className="mt-8">
          <AppText size="sm" weight="semibold">
            Vous n' avez pas encore de membre
          </AppText>
        </div>
      )}
      <Outlet />
    </section>
  );
}

export default Membre;
