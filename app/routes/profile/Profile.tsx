import { data, redirect, useFetcher, useOutletContext } from "react-router";
import AppText from "~/components/general/AppText/AppText";
import type { Route } from "./+types/Profile";
import { Input } from "~/components/ui/input";
import { useUserStore } from "~/store/userStore";
import AppButton from "~/components/general/AppButton/AppButton";
import { useFetcherEffect } from "~/hooks/useFetcherEffect";
import { UserService } from "~/services/userService";
import { Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectItem,
} from "~/components/ui/select";

export async function clientAction({ request }: Route.ClientActionArgs) {
  const user = JSON.parse(localStorage.getItem("user")!);
  if (!user) {
    return redirect("/auth/login");
  }

  const formData = await request.formData();
  const role = formData.get("role")?.toString();

  // check if role is present
  if (!role) {
    return data({
      message: "Role est absent.",
      error: null,
      data: null,
    });
  }

  try {
    // update user info first
    const res = await UserService.updateUser(user.user._id, {
      firstname: formData.get("firstname")?.toString(),
      lastname: formData.get("lastname")?.toString(),
    });

    // update profile
    if (role === "ADMIN") {
      const res = await UserService.updateAdmin(user?._id, {
        phone: formData.get("phone")?.toString(),
      });
    } else if (role === "LICENSED") {
      const res = await UserService.updateLicensed(user?._id, {
        phone: formData.get("phone")?.toString(),
        age: Number(formData.get("age")?.toString()),
        gender: formData.get("gender")?.toString(),
      });
    }

    // get updated profile
    let updatedUser;
    if (role === "ADMIN") {
      updatedUser = await UserService.getAdmin(user._id);
      console.log("admin", updatedUser);
    } else if (role === "LICENSED") {
      updatedUser = await UserService.getLicensed(user._id);
      console.log("licensed", updatedUser);
    }

    localStorage.setItem("user", JSON.stringify(updatedUser));

    return redirect("/profile");
  } catch (error: any) {
    return {
      data: null,
      message: error?.response?.data?.message || "Une erreur est survenue",
      error,
    };
  }
}

export async function clientLoader() {
  const user = JSON.parse(localStorage.getItem("user")!);
  if (!user) {
    localStorage.clear();
    return redirect("/auth/login");
  }

  return {
    data: user,
    meesage: "",
    error: null,
  };
}

function Profile({ loaderData }: Route.ComponentProps) {
  const user = loaderData?.data;
  const userStore = useUserStore((state) => state.user);
  const userConnecteRole = useOutletContext();
  const { fetcher } = useFetcherEffect();

  return (
    <section className="">
      <div>
        <AppText as="h1" size="xl" weight="bold">
          Mon profile
        </AppText>
        <AppText size="xs">Les informations concernant votre profile</AppText>
      </div>
      <fetcher.Form
        method="post"
        className="rounded-[20px] mt-8 flex flex-col gap-5 bg-white p-5"
      >
        <div className="flex flex-col gap-3">
          <div>
            <label htmlFor="firstname">
              <AppText weight="semibold" size="sm">
                Prénom
              </AppText>
            </label>
            <Input
              type="text"
              name="firstname"
              id="firstname"
              defaultValue={user?.user.firstname}
            />
          </div>
          <div>
            <label htmlFor="lastname">
              <AppText weight="semibold" size="sm">
                Nom
              </AppText>
            </label>
            <Input
              type="text"
              name="lastname"
              id="lastname"
              defaultValue={user?.user.lastname}
            />
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div>
            <label htmlFor="phone">
              <AppText weight="semibold" size="sm">
                Téléphone
              </AppText>
            </label>
            <Input
              type="text"
              name="phone"
              id="phone"
              defaultValue={user?.phone}
            />
          </div>
          <div>
            <label htmlFor="email">
              <AppText weight="semibold" size="sm">
                Email
              </AppText>
            </label>
            <Input
              type="email"
              name="email"
              id="email"
              readOnly
              defaultValue={user?.user?.email}
            />
          </div>
        </div>

        {user?.age && (
          <div>
            <label htmlFor="age">
              <AppText weight="semibold" size="sm">
                Age
              </AppText>
            </label>
            <Input type="text" name="age" id="age" defaultValue={user?.age} />
          </div>
        )}

        {user?.gender && (
          <div>
            <label htmlFor="gender">
              <AppText weight="semibold" size="sm">
                Genre
              </AppText>
            </label>
            <Select name="gender">
              <SelectTrigger>
                <SelectValue placeholder={user?.gender} />
              </SelectTrigger>
              <SelectContent id="gender" defaultValue={user?.gender}>
                <SelectGroup defaultValue={user?.gender}>
                  <SelectItem value="M">Masculin</SelectItem>
                  <SelectItem value="F">Feminin</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        )}

        <input
          type="text"
          defaultValue={userConnecteRole as string}
          name="role"
          id="role"
          hidden
        />
        <div>
          <AppButton type="submit">
            {fetcher.state !== "idle" ? (
              <Loader2 className="animate-spin" size={16} stroke="white" />
            ) : (
              "Sauvegarder"
            )}
          </AppButton>
        </div>
      </fetcher.Form>
    </section>
  );
}

export default Profile;
