import { LucideKeySquare, LucideUser2 } from "lucide-react";
import "./styles.css";
import { Link } from "react-router";
import AppButton from "~/components/general/AppButton/AppButton";
import AppText from "~/components/general/AppText/AppText";
import Icon from "~/components/icon";
import { Input } from "~/components/ui/input";
import { cn } from "~/lib/utils";

type Props = {};

export const formContainerClassName =
  "form-container flex flex-col w-[95%] lg:w-[65%] max-w-7xl items-center self-center justify-self-center px-4 py-5 lg:px-5 lg:py-10 rounded";

function Login({}: Props) {
  return (
    <form className={cn([formContainerClassName])}>
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
            />
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
            />
          </div>
        </div>
      </div>
      <div className="self-end mt-3 flex flex-col gap-4 xl:flex-row justify-between w-full">
        <Link to={"#"}>
          <AppText color="white" weight="light" size="sm">
            Mot de passe oublie?
          </AppText>
        </Link>
        <Link to="/auth/register">
          <AppText color="white" weight="light" size="sm">
            Inscription
          </AppText>
        </Link>
      </div>
      <AppButton className="w-full mt-8">Login</AppButton>
    </form>
  );
}

export default Login;
