import {
  LucideKeySquare,
  LucideMail,
  LucidePhone,
  LucideUser2,
} from "lucide-react";
import "./styles.css";
import { Link } from "react-router";
import AppButton from "~/components/general/AppButton/AppButton";
import AppText from "~/components/general/AppText/AppText";
import Icon from "~/components/icon";
import { Input } from "~/components/ui/input";
import { formContainerClassName } from "./Login";
import { cn } from "~/lib/utils";

type Props = {};

function Signup({}: Props) {
  return (
    <form className={cn([formContainerClassName])}>
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
              />
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
              />
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
                type="email"
              />
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
              />
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
              />
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
      <AppButton className="w-full mt-8">S' inscrire</AppButton>
    </form>
  );
}

export default Signup;
