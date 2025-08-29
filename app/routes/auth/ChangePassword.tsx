import { LoaderCircle, LucideKeySquare, LucideUser2 } from "lucide-react";
import "./styles.css";
import { data, Link, redirect, useFetcher, useNavigate } from "react-router";
import AppButton from "~/components/general/AppButton/AppButton";
import AppText from "~/components/general/AppText/AppText";
import Icon from "~/components/icon";
import { Input } from "~/components/ui/input";
import { cn } from "~/lib/utils";
import type { Route } from "./+types/ChangePassword";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useUserStore } from "~/store/userStore";
import { ChangePasswordSchema } from "./zodSchema";
import * as z from "zod";
import { UserService } from "~/services/userService";

export const formContainerClassName =
  "form-container flex flex-col w-[95%] lg:w-[768px] max-w-7xl items-center self-center justify-self-center px-4 py-5 lg:px-5 lg:py-10 rounded";

export async function clientAction({ request }: Route.ActionArgs) {
  try {
    let formData = await request.formData();
    const password = formData.get("password")?.toString()!;
    const confirmPassword = formData.get("confirmPassword")?.toString()!;
    const userId = formData.get("user-id")?.toString()!;

    const result = ChangePasswordSchema.safeParse({
      password,
      confirmPassword,
    });

    let error = {};

    // get errors if there is
    if (result.error) {
      error = {
        ...error,
        ...z.flattenError(result.error)?.fieldErrors,
      };
    }

    // return error if there is
    if (Object.keys(error).length > 0) {
      return data({ errors: error });
    }

    // if there is no error
    const res = await UserService.resetPassword(userId, password);
    return redirect("/auth/login");
  } catch (error) {
    return data({ message: "Verifie bien votre email et mot de passe" });
  }
}

// check if the key is valid
export async function clientLoader({ request }: Route.ClientLoaderArgs) {
  const url = new URL(request.url);
  const key = new URLSearchParams(url.search).get("key");
  if (!key) {
    return {
      message: "La clé est manquante",
      data: null,
      error: null,
    };
  }

  try {
    const res = await UserService.verifyChangePassKey(key);
    return {
      data: res.data,
      message: null,
      error: null,
    };
  } catch (error) {
    return {
      error,
      message: "Une erreur est survenue",
      data: null,
    };
  }
}

function ChangePassword({ actionData, loaderData }: Route.ComponentProps) {
  const fetcher = useFetcher();
  const userStore = useUserStore((state) => state.admin);
  const setUser = useUserStore((state) => state.setUser);
  const navigate = useNavigate();
  const data = fetcher.data;
  const errorCheckingKey = loaderData?.error;
  const userData = loaderData.data;
  const [isEqual, setIsEqual] = useState<null | boolean>(null);

  const [password, setPassword] = useState<{
    password: string;
    confirmPassword: string;
  }>({
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (password.password && password.confirmPassword) {
      setIsEqual(password.password === password.confirmPassword);
    } else if (!password.password && !password.confirmPassword) {
      setIsEqual(null);
    }
  }, [password.password, password.confirmPassword]);

  useEffect(() => {
    if (fetcher.data?.message) {
      toast.error(fetcher.data.message);
    }

    if (fetcher.data?.user) {
      setUser(fetcher.data.user);
      navigate("/");
    }
  }, [fetcher.data]);

  if (errorCheckingKey) {
    return (
      <div className="flex flex-col items-center justify-center gap-5 w-full">
        <AppText color="white" size="2xl" weight="semibold">
          La clé est expirée. Veuiller réessayer.
        </AppText>
        <AppButton onClick={() => navigate("/auth/change-password-request")}>
          Réessayer
        </AppButton>
      </div>
    );
  }

  return (
    <fetcher.Form
      className={cn(["max-w-[768px]", formContainerClassName])}
      method="post"
    >
      <div className="mb-20">
        <Icon name="LogoBease" />
      </div>
      <div className="flex flex-col items-center gap-5 w-full">
        <AppText color="white" size="2xl" weight="semibold">
          Changer de mot de passe
        </AppText>
        <div className="w-full"></div>

        <div className="flex gap-3 w-full">
          <div className="w-full">
            <label htmlFor="password">
              <AppText color="white" weight="semibold">
                Mot de passe
              </AppText>
            </label>
            <div>
              <LucideKeySquare className="absolute mt-1.5 ml-2" />

              <Input
                className="text-black bg-white mt-1 pl-10 rounded-[20px] h-[40px]"
                id="password"
                type="password"
                name="password"
                required
                value={password.password}
                onChange={(e) =>
                  setPassword({ ...password, password: e.target.value })
                }
              />
              {data?.errors?.password && (
                <AppText color="red" size="xs">
                  {data?.errors?.password[0]}
                </AppText>
              )}
            </div>
          </div>

          <input
            type="text"
            name="user-id"
            defaultValue={userData.sub}
            className="hidden"
          />

          <div className="w-full">
            <label htmlFor="confirmPassword">
              <AppText color="white" weight="semibold">
                Confirmer
              </AppText>
            </label>
            <div>
              <LucideKeySquare className="absolute mt-1.5 ml-2" />

              <Input
                className="text-black bg-white mt-1 pl-10 rounded-[20px] h-[40px]"
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                required
                value={password.confirmPassword}
                onChange={(e) =>
                  setPassword({ ...password, confirmPassword: e.target.value })
                }
              />
              {data?.errors?.confirmPassword && (
                <AppText color="red" size="xs">
                  {data?.errors.confirmPassword[0]}
                </AppText>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-2 mt-8 w-full">
        <AppButton
          className={cn([
            "flex-1",
            isEqual === false && "filter grayscale cursor-not-allowed",
          ])}
          disabled={isEqual === false}
        >
          {fetcher.state !== "idle" ? (
            <LoaderCircle
              className="loader-circle"
              id="loader-circle"
              stroke="stroke-white"
            />
          ) : (
            "Valider"
          )}
        </AppButton>
        <AppButton
          variant="outlined"
          type="button"
          onClick={() => navigate(-1)}
          className="flex-1"
        >
          Annuler
        </AppButton>
      </div>
    </fetcher.Form>
  );
}

export default ChangePassword;
