import {
  data,
  redirect,
  useFetcher,
  useOutletContext,
  useSubmit,
} from "react-router";
import AppText from "~/components/general/AppText/AppText";
import type { Route } from "./+types/Profile";
import { Input } from "~/components/ui/input";
import { useUserStore } from "~/store/userStore";
import AppButton from "~/components/general/AppButton/AppButton";
import { UserService } from "~/services/userService";
import { Camera, Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectItem,
} from "~/components/ui/select";
import profile_placeholder from "~/assets/images/profile_placeholder.jpg";
import { useEffect, useRef, useState } from "react";
import { FileService } from "~/services/fileService";
import { toast } from "sonner";

const apiBaseURL = import.meta.env.VITE_API_URL;

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
    // post img first
    let imgProfileId = "";
    if ((formData.get("profile") as File)?.name) {
      const res = await FileService.uploadProfile(formData);
      imgProfileId = res._id;
    }

    // update user info first
    const res = await UserService.updateUser(user.user._id, {
      firstname: formData.get("firstname")?.toString(),
      lastname: formData.get("lastname")?.toString(),
      profile: imgProfileId || user.user.profile,
    });

    // // update profile
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
    } else if (role === "LICENSED") {
      updatedUser = await UserService.getLicensed(user._id);
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
  const fetcher = useFetcher();
  const inputFileRef = useRef<HTMLInputElement>(null);
  const roleInputRef = useRef<HTMLInputElement>(null);
  const profileRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [profileImg, setProfileImg] = useState<any>();
  const [profileHasChanged, setProfileHasChanged] = useState<boolean>(false);
  const submit = useSubmit();

  const handleChangeImage = () => {
    if (inputFileRef.current) {
      inputFileRef.current.click();
    }
  };

  const handleSelectImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = URL.createObjectURL(e.target.files![0]);
    setProfileImg(file);
    setProfileHasChanged(true);
  };

  useEffect(() => {
    if (fetcher?.data?.message) {
      toast.error(fetcher?.data?.message);
    }
  }, [fetcher?.data?.message]);

  useEffect(() => {
    if (user?.user?.profile) {
      setProfileImg(apiBaseURL + "files/image/" + user?.user?.profile);
    } else {
      setProfileImg(profile_placeholder);
    }
  }, []);

  return (
    <section className="">
      <div>
        <AppText as="h1" size="xl" weight="bold">
          Mon profile
        </AppText>
        <AppText size="xs">Les informations concernant votre profile</AppText>
      </div>
      <fetcher.Form
        method="patch"
        className="rounded-[20px] mt-8 flex flex-col-reverse gap-5 bg-white p-5"
        ref={formRef}
        encType="multipart/form-data"
      >
        <div className="flex flex-col gap-5">
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
              <Select name="gender" defaultValue={user?.gender}>
                <SelectTrigger name="gender">
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
            ref={roleInputRef}
            hidden
          />

          <div>
            <AppButton
              type="button"
              onClick={async (e) => {
                // await saveProfileImg();
                submit(formRef.current, {
                  method: "post",
                });
              }}
            >
              {fetcher.state !== "idle" ? (
                <Loader2 className="animate-spin" size={16} stroke="white" />
              ) : (
                "Sauvegarder"
              )}
            </AppButton>
          </div>
        </div>
        <div className="relative flex justify-center">
          <div className="w-fit relative">
            {/* {user?.user?.profile ? (
              <img
                alt=""
                className="rounded-full"
                width={250}
                height="auto"
                src={profileImg}
              />
            ) : (
              <img
                alt=""
                className="rounded-full"
                width={250}
                height="auto"
                src={profile_placeholder}
              />
            )} */}
            <img
              alt=""
              className="rounded-[50%] w-[250px] h-[250px]"
              src={profileImg}
            />

            <input
              type="file"
              name="profile"
              id="file"
              ref={inputFileRef}
              hidden
              onChange={handleSelectImage}
            />
            <Camera
              className="absolute cursor-pointer bottom-0 right-0"
              onClick={handleChangeImage}
              stroke="#9d9d9d"
            />
          </div>
        </div>
      </fetcher.Form>
    </section>
  );
}

export default Profile;
