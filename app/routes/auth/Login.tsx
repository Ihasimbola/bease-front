import { LoaderCircle, LucideKeySquare, LucideUser2 } from "lucide-react";
import "./styles.css";
import { data, Link, redirect, useFetcher, useNavigate } from "react-router";
import AppButton from "~/components/general/AppButton/AppButton";
import AppText from "~/components/general/AppText/AppText";
import Icon from "~/components/icon";
import { Input } from "~/components/ui/input";
import { cn } from "~/lib/utils";
import { UserService } from "~/services/userService";
import type { Route } from "./+types/Login";
import { toast } from "sonner";
import { useEffect } from "react";
import { useUserStore } from "~/store/userStore";

export const formContainerClassName =
  "form-container flex flex-col w-[95%] lg:w-[65%] max-w-7xl items-center self-center justify-self-center px-4 py-5 lg:px-5 lg:py-10 rounded";

export async function clientAction({ request }: Route.ActionArgs) {
  try {
    let formData = await request.formData();
    const email = formData.get("email")?.toString()!;
    const password = formData.get("password")?.toString()!;

    const res = await UserService.login({ email, password });
    localStorage.setItem("token", "Bearer " + res.token);
    localStorage.setItem("refreshToken", "Bearer " + res.refreshToken);
    localStorage.setItem("user", JSON.stringify(res.adminDoc));
    return data({
      user: res.adminDoc,
    });
    // return redirect("/");
  } catch (error) {
    return data({ message: "Verifie bien votre email et mot de passe" });
  }
}

function Login({ actionData }: Route.ComponentProps) {
  const fetcher = useFetcher();
  const userStore = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const navigate = useNavigate();
  const errors = fetcher.data;

  useEffect(() => {
    if (fetcher.data?.message) {
      toast.error(fetcher.data.message);
    }

    if (fetcher.data?.user) {
      setUser(fetcher.data.user);
      navigate("/");
    }
  }, [fetcher?.data]);

  return (
    <fetcher.Form className={cn([formContainerClassName])} method="post">
      <div className="mb-20">
        <Icon name="LogoBease" />
      </div>
      <div className="flex flex-col items-center gap-5 w-full">
        <AppText color="white" size="2xl" weight="semibold">
          Login
        </AppText>
        <div className="w-full">
          <label htmlFor="email">
            <AppText color="white" weight="semibold">
              Email
            </AppText>
          </label>
          <div>
            <LucideUser2 className="absolute mt-1.5 ml-2" />
            <Input
              className="text-black bg-white mt-1 pl-10 rounded-[20px] h-[40px]"
              id="email"
              type="email"
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
          <label htmlFor="password">
            <AppText color="white" weight="semibold">
              Password
            </AppText>
          </label>
          <div>
            <LucideKeySquare className="absolute mt-1.5 ml-2" />

            <Input
              className="text-black bg-white mt-1 pl-10 rounded-[20px] h-[40px]"
              id="password"
              type="password"
              name="password"
            />
            {errors?.password && (
              <AppText color="red" size="xs">
                {errors.password[0]}
              </AppText>
            )}
          </div>
        </div>
      </div>
      <div className="self-end mt-3 flex flex-col gap-4 xl:flex-row justify-between w-full">
        <Link
          to={"/auth/change-password-request"}
          className="flex flex-col gap-2"
        >
          <AppText color="white" weight="light" size="sm">
            Mot de passe oublie?
          </AppText>
          <AppText color="white" weight="light" size="sm">
            Changer de passe oublie
          </AppText>
        </Link>
        <Link to="/auth/register">
          <AppText color="white" weight="light" size="sm">
            Inscription
          </AppText>
        </Link>
      </div>
      <AppButton className="w-full mt-8">
        {fetcher.state !== "idle" ? (
          <LoaderCircle
            className="loader-circle"
            id="loader-circle"
            stroke="stroke-white"
          />
        ) : (
          "Login"
        )}
      </AppButton>
    </fetcher.Form>
  );
}

export default Login;
