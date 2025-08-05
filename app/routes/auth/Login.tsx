import "./styles.css";
import { Link } from "react-router";
import AppButton from "~/components/general/AppButton/AppButton";
import AppText from "~/components/general/AppText/AppText";
import Icon from "~/components/icon";
import { Input } from "~/components/ui/input";

type Props = {};

function Login({}: Props) {
  return (
    <form className="form-container flex flex-col items-center self-center justify-self-center px-5 py-10  rounded">
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
          <Input className="text-black bg-white mt-2" id="email" type="email" />
        </div>

        <div className="w-full">
          <label htmlFor="password">
            <AppText color="white" weight="semibold">
              Password
            </AppText>
          </label>
          <Input
            className="text-black bg-white mt-2"
            id="password"
            type="password"
          />
        </div>
      </div>
      <Link to={"#"} className="self-end mt-3">
        <AppText color="white" weight="light" size="sm">
          Mot de passe oublie?
        </AppText>
      </Link>
      <AppButton className="w-full mt-8">Login</AppButton>
    </form>
  );
}

export default Login;
