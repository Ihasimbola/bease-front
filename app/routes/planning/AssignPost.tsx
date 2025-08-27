import React, { useEffect, useState } from "react";
import { data, redirect, useFetcher, useNavigate } from "react-router";
import Dialog from "~/components/common/dialog/Dialog";
import AppText from "~/components/general/AppText/AppText";
import { PostService } from "~/services/PostService";
import { UserService } from "~/services/userService";
import type { Route } from "./+types/AssignPost";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import AppButton from "~/components/general/AppButton/AppButton";
import { toast } from "sonner";
import { AssingPostSchema } from "./ValidationShema";

type PostnameType = {
  _id: string;
  name: string;
};

type LicensedType = {
  _id: string;
  firstname: string;
  lastname: string;
};

type DataType = {
  post: PostnameType;
  allLicensed: LicensedType[];
};

export async function clientAction({ request }: Route.ClientActionArgs) {
  const formData = await request.formData();
  const url = new URL(request.url);
  const matchId = new URLSearchParams(url.search).get("match");
  if (!matchId) {
    return data({
      message: "MatchId absent",
      error: null,
      data: null,
    });
  }

  formData.append("matchId", matchId);

  const result = AssingPostSchema.safeParse({
    licensedId: formData.get("licensedId")?.toString(),
  });

  if (result.error) {
    // console.log(result.error);
    return data({
      message: "Choississez un membre",
      data: null,
      error: null,
    });
  }

  try {
    const res = await PostService.AssignPost({
      licensedId: formData.get("licensedId")?.toString(),
      matchId: matchId,
      postNameId: formData.get("postNameId")?.toString(),
    });
    return redirect("/planning");
  } catch (error) {
    return data({
      message: "Une erreur est survenue",
      error,
      data: null,
    });
  }
}

export async function clientLoader({ request }: Route.ClientLoaderArgs) {
  const url = new URL(request.url);
  const post = new URLSearchParams(url.search).get("post");

  const club = JSON.parse(localStorage.getItem("user")!)?.club;
  if (!club) {
    return {
      message: "Une erreur est survenue",
      data: null,
      error: null,
    };
  }

  try {
    const { data: allLicensed } = await UserService.getLicensedByClub(club);
    const postNames = await PostService.getPostNames();

    const postname: PostnameType = postNames.data.find(
      (postItem: { _id: string; name: string }) => postItem.name === post
    );

    return {
      message: "",
      data: {
        allLicensed: allLicensed,
        postname,
      },
      error: null,
    };
  } catch (error) {
    return {
      message: "Une erreur est survenue",
      data: null,
      error,
    };
  }
}

function AssignPost({ loaderData }: Route.ComponentProps) {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();
  const { data, error, message } = loaderData;
  const fetcher = useFetcher();

  useEffect(() => {
    if (fetcher?.data?.message) {
      toast.error(fetcher?.data?.message);
    }

    if (fetcher.data === null) {
      toast.error("Une erreur est survenue");
      navigate(-1);
    }
  }, [fetcher?.data]);

  useEffect(() => {
    if (!isOpen) navigate(-1);
  }, [isOpen]);

  return (
    <Dialog setIsOpen={setIsOpen} close={isOpen}>
      <AppText weight="bold">Assigner à un poste</AppText>
      <fetcher.Form method="post" className="flex flex-col gap-5 mt-4">
        <div>
          <label htmlFor="post">
            <AppText size="sm" weight="semibold">
              Postes
            </AppText>
          </label>
          <Select
            name="postNameId"
            disabled={false}
            defaultValue={data?.postname._id}
          >
            <SelectTrigger className="bg-white">
              <SelectValue placeholder={data?.postname.name} />
              {/* <SelectValue placeholder="Selectionner un Poste" /> */}
            </SelectTrigger>
            <SelectContent
              className="relative z-[1300]"
              id="category"
              defaultValue={data?.postname._id}
            >
              <SelectGroup
                className="bg-white relative z-[1300]"
                defaultValue={data?.postname._id}
              >
                <SelectItem
                  value={data!.postname._id}
                  className=""
                  defaultValue={data?.postname._id}
                >
                  {data?.postname.name}
                </SelectItem>
                {/* {data?.postnames.map(
                  (postname: { name: string; _id: string }, idx: number) => (
                    <SelectItem
                      key={`postname-${idx}`}
                      value={postname?._id}
                      className=""
                    >
                      {postname.name}
                    </SelectItem>
                  )
                )} */}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label htmlFor="licensed">
            <AppText size="sm" weight="semibold">
              Les membres du club
            </AppText>
          </label>
          <Select name="licensedId">
            <SelectTrigger className="bg-white">
              <SelectValue placeholder="Selectionner un Membre" />
            </SelectTrigger>
            <SelectContent className="relative z-[1300]" id="category">
              <SelectGroup className="bg-white relative z-[1300]">
                {data?.allLicensed.map((licensed, idx: number) => (
                  <SelectItem
                    key={`licensed-${idx}`}
                    value={licensed?._id}
                    className=""
                  >
                    {`${licensed.user.firstname} ${licensed.user.lastname}`}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-4">
          <AppButton type="submit">Assigner</AppButton>
          <AppButton
            type="button"
            variant="outlined"
            onClick={() => navigate(-1)}
          >
            Annuler
          </AppButton>
        </div>
      </fetcher.Form>
    </Dialog>
  );
}

export default AssignPost;
