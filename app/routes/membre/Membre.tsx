import { PlusIcon, SearchIcon, Upload } from "lucide-react";
import { useLayoutEffect } from "react";
import AppButton from "~/components/general/AppButton/AppButton";
import AppText from "~/components/general/AppText/AppText";
import { Input } from "~/components/ui/input";
import Table from "./Table";
import type { Route } from "./+types/Membre";
import { Form, Outlet, useNavigate, useSubmit } from "react-router";
import { UserService, type LicensedResponse } from "~/services/userService";
import { tableHeader } from "./tableData";
import type { TableData } from "./type";
import { toast } from "sonner";

export async function clientLoader({ request }: Route.ClientLoaderArgs) {
  const clubId = JSON.parse(localStorage.getItem("user")!)?.club;
  const url = new URL(request.url);
  const search = new URLSearchParams(url.search).get("search")?.toString();

  if (!clubId) {
    return {
      membres: [],
      message: "Vous n' avez pas encore créé un club",
    };
  }

  try {
    const { data: membres } = await UserService.getLicensedByClub(
      clubId,
      search
    );

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
  const submit = useSubmit();
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
            <AppText size="sm" weight="medium" color="white">
              Importer un ficher excel
            </AppText>
          </AppButton>
          <AppButton onClick={() => navigate("add-member")}>
            <PlusIcon size={16} />
            <AppText size="sm" weight="medium" color="white">
              Ajouter un membre
            </AppText>
          </AppButton>
        </div>
      </div>

      <Form
        className="relative mt-6"
        role="search"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            submit(e.currentTarget, { replace: true });
          }
        }}
      >
        <Input
          type="search"
          id="search"
          name="search"
          placeholder="Rechercher par Nom ou Prénom..."
          className="text-xs rounded-[20px] pl-8 max-w-[450px] bg-white"
          onChange={(e) => {
            if (e.currentTarget.value === "") {
              submit(e.currentTarget.form, { replace: true });
            }
          }}
        />
        <div className="absolute top-2.5 left-2">
          <SearchIcon color="gray" size={16} />
        </div>
      </Form>
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
