import {
  Calendar1Icon,
  LoaderCircle,
  LucideKeySquare,
  LucideMail,
  LucidePhone,
  LucideUser2,
} from "lucide-react";
import "./styles.css";
import {
  data,
  Link,
  redirect,
  useFetcher,
  useLocation,
  useNavigate,
} from "react-router";
import AppButton from "~/components/general/AppButton/AppButton";
import AppText from "~/components/general/AppText/AppText";
import Icon from "~/components/icon";
import { Input } from "~/components/ui/input";
import { formContainerClassName } from "./Login";
import { cn } from "~/lib/utils";
import type { Route } from "./+types/Signup";
import { AdminSchema, RegisterSchema } from "./zodSchema";
import { useEffect, useState } from "react";
import * as z from "zod";
import { UserService } from "~/services/userService";
import { toast } from "sonner";
import { useUserStore } from "~/store/userStore";
import {
  Select,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectValue,
} from "~/components/ui/select";
import NumberIcon from "~/components/icon/NumberIcon";

type Props = {};

export async function clientAction({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const url = new URL(request.url).search;
  const licensedEmail = new URLSearchParams(url).get("email");
  const licensedcategory = new URLSearchParams(url).get("category");
  const club = new URLSearchParams(url).get("club");

  // if the user is from the mail invitation
  if (licensedEmail && club) {
    const user = {} as any;
    for (const [key, value] of formData.entries()) {
      user[key] = value;
    }

    const parseUserResult = RegisterSchema.safeParse({
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      password: user.password,
      confirmPassword: user.confirmPassword,
    });

    const parseAdminResult = AdminSchema.safeParse({
      gender: user.gender,
      age: Number(user.age) || 0,
    });

    let error = {};

    // get errors if there is
    if (parseUserResult.error) {
      error = {
        ...error,
        ...z.flattenError(parseUserResult.error)?.fieldErrors,
      };
    }

    if (parseAdminResult.error) {
      error = {
        ...error,
        ...z.flattenError(parseAdminResult.error).fieldErrors,
      };
    }

    // return error if there is
    if (Object.keys(error).length > 0) {
      return data({ errors: error });
    }

    try {
      const res = await UserService.registerLicensed({
        age: Number(user.age),
        firstname: user.firstname,
        lastname: user.lastname,
        email: licensedEmail,
        gender: user.gender,
        password: user.password,
        phone: user.phone,
        number: user.number || "",
        isConfirmed: true,
        category: licensedcategory || "",
        club: club,
      });

      localStorage.setItem("token", "Bearer " + res.token);
      localStorage.setItem("refreshToken", "Bearer " + res.refreshToken);
      localStorage.setItem("user", JSON.stringify(res.data));

      return redirect("/");
      // return data({
      //   user: res.data,
      // });
    } catch (error) {
      return data({ requestError: error });
    }
  }

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
    return data({
      user: res.data,
    });
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
  const fetcher = useFetcher();
  const navigate = useNavigate();
  const location = useLocation();
  const setUser = useUserStore((state) => state.setUser);
  const [accept, setAccept] = useState(false);

  // if the user register from email, get search param
  const emailFromInvitation = new URLSearchParams(location.search)?.get(
    "email"
  );

  useEffect(() => {
    console.log(!accept && !isEqual);
  }, [accept]);

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

  // set user store
  useEffect(() => {
    if (fetcher.data?.user) {
      setUser(fetcher.data.user);
      navigate("/");
    }
  }, [fetcher.data]);

  const errors = fetcher.data?.errors;
  const requestError = fetcher.data?.requestError;

  useEffect(() => {
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
          {emailFromInvitation
            ? "Inscription"
            : "Inscription pour Administrateur de club"}
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
                defaultValue={emailFromInvitation || ""}
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

        {emailFromInvitation && (
          <div className="flex gap-5 justify-between w-full ">
            <div className="flex-1">
              <label htmlFor="age">
                <AppText color="white" weight="semibold">
                  Votre age
                </AppText>
              </label>
              <div>
                <Calendar1Icon className="absolute mt-2 ml-2" />
                <Input
                  className="text-black bg-white mt-1 pl-10 rounded-[20px] h-[40px]"
                  id="age"
                  type="number"
                  name="age"
                />
              </div>
              {errors?.age && (
                <AppText color="red" size="xs">
                  {errors.age[0]}
                </AppText>
              )}
            </div>

            <div className="xl:flex flex-1">
              <div className="flex-1">
                <AppText color="white" weight="semibold">
                  Genre
                </AppText>
                <div className="mt-2">
                  <Select name="gender">
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Selectionner une categorie" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup className="bg-white">
                        <SelectItem value="M">Masculin</SelectItem>
                        <SelectItem value="F">Feminin</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                {errors?.gender && (
                  <AppText color="red" size="xs">
                    {errors.gender[0]}
                  </AppText>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="self-start w-full">
          <label htmlFor="number">
            <AppText color="white" weight="semibold">
              Numéro de licence
            </AppText>
          </label>
          <div>
            <div className="absolute mt-2 ml-2">
              <NumberIcon />
            </div>
            <Input
              className="text-black bg-white mt-1 pl-10 rounded-[20px] h-[40px]"
              id="number"
              type="text"
              name="number"
            />
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
      <div className="flex flex-col gap-2 mt-5">
        <AppText color="white" size="xs" weight="normal">
          En m’inscrivant, j’accepte que mes données soient utilisées par B.EASE
          pour la gestion des plannings et la communication du club.
        </AppText>
        <AppText color="white" size="xs" weight="normal">
          Elles sont conservées tant que mon compte est actif et accessibles aux
          administrateurs du club et à B.EASE. Je peux exercer mes droits
          (accès, modification, suppression) à tout moment
        </AppText>
        <div className="flex gap-3">
          <input
            type="checkbox"
            id="accept"
            name="accept"
            checked={accept}
            onChange={() => setAccept((prev) => !prev)}
          />
          <Link
            to="https://www.beasebasket.com/protection-de-vos-donnees-personnelles/"
            target="_blank"
          >
            <AppText
              color="white"
              size="xs"
              weight="normal"
              className="underline"
            >
              J’ai lu et j’accepte la politique de confidentialité
            </AppText>
          </Link>
        </div>
      </div>
      <AppButton
        className={cn([
          "w-full mt-8",
          !accept && "filter grayscale cursor-not-allowed",
        ])}
        disabled={!accept}
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
