import {
  LoaderCircle,
  LucideKeySquare,
  LucideMail,
  LucidePhone,
  LucideUser2,
} from "lucide-react";
import "./styles.css";
import { data, Link, redirect, useFetcher } from "react-router";
import AppButton from "~/components/general/AppButton/AppButton";
import AppText from "~/components/general/AppText/AppText";
import Icon from "~/components/icon";
import { Input } from "~/components/ui/input";
import { formContainerClassName } from "./Login";
import { cn } from "~/lib/utils";
import type { Route } from "./+types/Signup";
import { RegisterSchema } from "./zodSchema";
import { useEffect, useState } from "react";
import * as z from "zod";
import { UserService } from "~/services/userService";
import { toast } from "sonner";

type Props = {};

export async function clientAction({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const user = {} as any;
  for (let [key, value] of formData.entries()) {
    user[key] = value;
  }

  const result = RegisterSchema.safeParse(user);
  if (result.error) {
    return data({ errors: z.flattenError(result.error).fieldErrors });
  }

  try {
    const res = await UserService.register({
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      phone: user.phone || "",
      password: user.password,
    });
    localStorage.setItem("token", "Bearer " + res.token);
    localStorage.setItem("refreshToken", "Bearer " + res.refreshToken);
    localStorage.setItem("user", JSON.stringify(res.data));
    return redirect("/");
  } catch (error) {
    return data({ requestError: error });
  }
}

function Signup({ actionData }: Route.ComponentProps) {
  // state for checking password correspondance
  const [pass, setPass] = useState<{
    password: string;
    confirmPassword: string;
  }>({
    password: "",
    confirmPassword: "",
  });
  const [isEqual, setIsEqual] = useState<null | boolean>(null);

  // check if password and confirm password are equal
  useEffect(() => {
    const checkPassword = () => {
      if (pass.password && pass.confirmPassword) {
        setIsEqual(pass.password === pass.confirmPassword);
      } else if (!pass.password && !pass.confirmPassword) {
        setIsEqual(null);
      }
    };
    checkPassword();
  }, [pass.password, pass.confirmPassword]);

  const fetcher = useFetcher();
  const errors = fetcher.data?.errors;
  const requestError = fetcher.data?.requestError;
  console.log(requestError);

  useEffect(() => {
    console.log("called");
    if (requestError?.response?.status === 400) {
      toast.error(requestError?.response?.data?.message);
    }
  }, [fetcher.data?.requestError]);

  return (
    <fetcher.Form className={cn([formContainerClassName])} method="POST">
      <div className="mb-10">
        <Icon name="LogoBease" />
      </div>
      <div className="flex flex-col items-center gap-5 w-full">
        <AppText color="white" size="2xl" weight="semibold">
          Inscription
        </AppText>
        <div className="flex gap-5 justify-between w-full">
          <div className="w-full">
            <label htmlFor="firstname">
              <AppText color="white" weight="semibold">
                Nom
              </AppText>
            </label>
            <div>
              <LucideUser2 className="absolute mt-1.5 ml-2" />
              <Input
                className="text-black bg-white mt-1 pl-10 rounded-[20px] h-[40px]"
                id="firstname"
                type="text"
                name="firstname"
              />
              {errors?.firstname && (
                <AppText color="red" size="xs">
                  {errors.firstname[0]}
                </AppText>
              )}
            </div>
          </div>

          <div className="w-full">
            <label htmlFor="lastname">
              <AppText color="white" weight="semibold">
                Prenom
              </AppText>
            </label>
            <div>
              <LucideUser2 className="absolute mt-1.5 ml-2" />
              <Input
                className="text-black bg-white mt-1 pl-10 rounded-[20px] h-[40px]"
                id="lastname"
                type="text"
                name="lastname"
              />
              {errors?.lastname && (
                <AppText color="red" size="xs">
                  {errors.lastname[0]}
                </AppText>
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-5 justify-between w-full">
          <div className="w-full">
            <label htmlFor="email">
              <AppText color="white" weight="semibold">
                Email
              </AppText>
            </label>
            <div>
              <LucideMail className="absolute mt-2 ml-2" />
              <Input
                className="text-black bg-white mt-1 pl-10 rounded-[20px] h-[40px]"
                id="email"
                type="text"
                name="email"
              />
              {errors?.email && (
                <AppText color="red" size="xs">
                  {errors.email[0]}
                </AppText>
              )}
            </div>
          </div>

          <div className="w-full">
            <label htmlFor="phone">
              <AppText color="white" weight="semibold">
                Téléphone
              </AppText>
            </label>
            <div>
              <LucidePhone className="absolute mt-2 ml-2" />
              <Input
                className="text-black bg-white mt-1 pl-10 rounded-[20px] h-[40px]"
                id="phone"
                type="text"
                name="phone"
              />
            </div>
          </div>
        </div>

        <div className="flex gap-5 justify-between w-full ">
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
                onChange={(e) =>
                  setPass({
                    ...pass,
                    password: e.target.value,
                    confirmPassword: pass.confirmPassword,
                  })
                }
              />
              {errors?.password && (
                <AppText color="red" size="xs">
                  {errors.password[0]}
                </AppText>
              )}
            </div>
          </div>

          <div className="w-full">
            <label htmlFor="confirm-password">
              <AppText color="white" weight="semibold">
                Confirmer
              </AppText>
            </label>
            <div>
              <LucideKeySquare className="absolute mt-1.5 ml-2" />

              <Input
                className="text-black bg-white mt-1 pl-10 rounded-[20px] h-[40px]"
                id="confirm-password"
                type="password"
                name="confirmPassword"
                onChange={(e) =>
                  setPass({
                    ...pass,
                    confirmPassword: e.target.value,
                    password: pass.password,
                  })
                }
              />
              {errors?.confirmPassword && (
                <AppText color="red" size="xs">
                  {errors?.confirmPassword[0]}
                </AppText>
              )}
              {isEqual === false && (
                <AppText color="red" size="xs">
                  Les mots de passe ne sont pas identiques
                </AppText>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="self-end mt-3 flex justify-between w-full">
        <Link to="/auth/login">
          <AppText color="white" weight="light" size="sm">
            J'ai deja un compte
          </AppText>
        </Link>
      </div>
      <AppButton
        className={cn([
          "w-full mt-8",
          isEqual === false && "filter grayscale cursor-not-allowed",
        ])}
        disabled={isEqual === false}
      >
        {fetcher.state === "idle" ? (
          "S'inscrire"
        ) : (
          <LoaderCircle
            className="loader-circle"
            id="loader-circle"
            stroke="stroke-white"
          />
        )}
      </AppButton>
    </fetcher.Form>
  );
}

export default Signup;
