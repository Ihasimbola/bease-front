import React, { useEffect } from "react";
import { formContainerClassName } from "./ChangePassword";
import { data, useFetcher, useNavigate } from "react-router";
import { cn } from "~/lib/utils";
import AppText from "~/components/general/AppText/AppText";
import { LoaderCircle, LucideUser2 } from "lucide-react";
import { Input } from "~/components/ui/input";
import AppButton from "~/components/general/AppButton/AppButton";
import { EmailSchema } from "./zodSchema";
import * as z from "zod";
import { UserService } from "~/services/userService";
import { MailingService } from "~/services/MailingService";
import { toast } from "sonner";
import type { Route } from "./+types/SendMail";
import Icon from "~/components/icon";

type Props = {};

export async function clientAction({ request }: Route.ActionArgs) {
  try {
    let formData = await request.formData();
    const email = formData.get("email")?.toString()!;

    const result = EmailSchema.safeParse({
      email,
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
    const res = await MailingService.sendResetPasswordMail(email);
    return data({ message: "Verifier votre boîte mail", status: res.status });
  } catch (error) {
    return data({ message: "Une érreur est survenue" });
  }
}

const SendMail = (props: Props) => {
  const fetcher = useFetcher();
  const navigate = useNavigate();
  const errors = fetcher.data;

  useEffect(() => {
    if (fetcher.data?.status === 201) {
      toast.success(fetcher.data.message, { duration: 5000 });
    }
  }, [fetcher.data]);

  return (
    <fetcher.Form
      className={cn(["max-w-[768px]", formContainerClassName])}
      method="post"
    >
      <div className="mb-20">
        <Icon name="LogoBease" />
      </div>
      <AppText color="white" size="2xl" weight="semibold">
        Entrer votre adresse mail
      </AppText>
      <div className="w-full mt-8">
        <label htmlFor="email">
          <AppText color="white" weight="semibold">
            Email
          </AppText>
        </label>
        <div>
          <LucideUser2 className="absolute mt-1.5 ml-2" />
          <Input
            className="w-full text-black bg-white mt-1 pl-10 rounded-[20px] h-[40px]"
            id="email"
            type="email"
            name="email"
            required
          />
          {errors?.email && (
            <AppText color="red" size="xs">
              {errors.email[0]}
            </AppText>
          )}
        </div>
      </div>

      <div className="flex gap-2 mt-8 w-full">
        <AppButton className={cn(["flex-1"])} type="submit">
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
          onClick={() => navigate("/auth/login")}
          className="flex-1"
        >
          Annuler
        </AppButton>
      </div>
    </fetcher.Form>
  );
};

export default SendMail;
