import { UserService, type LicensedResponse } from "~/services/userService";
import type { Route } from "../super_admin/+types/AllMemberClub";
import type { TableData } from "../type";
import Table from "../Table";
import { tableHeader } from "../tableData";
import AppText from "~/components/general/AppText/AppText";
type Props = {};

export async function clientLoader({
  request,
  params,
}: Route.ClientLoaderArgs) {
  const clubId = params.id;

  try {
    const { data: membres } = await UserService.getLicensedByClub(clubId);

    const data: TableData[] = membres.map((membre: LicensedResponse) => ({
      firstname: membre?.user?.firstname,
      lastname: membre?.user?.lastname,
      profile: membre?.user?.profile,
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

function AllMemberClub({ loaderData }: Route.ComponentProps) {
  return (
    <>
      <div className="w-full text-right mb-5">
        <AppText>
          {`Nombre total des membres de ce club: `}
          <AppText as="span" weight="semibold">
            {loaderData?.data?.length}
          </AppText>
        </AppText>
      </div>
      <Table
        tableData={loaderData?.data || ([] as TableData[])}
        tableHeader={tableHeader}
      />
    </>
  );
}

export default AllMemberClub;
