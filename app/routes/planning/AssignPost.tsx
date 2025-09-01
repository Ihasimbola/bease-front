import React, { useEffect, useState } from "react";
import {
  data,
  redirect,
  useFetcher,
  useLocation,
  useNavigate,
} from "react-router";
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
import { useFetcherEffect } from "~/hooks/useFetcherEffect";

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
    // return redirect("/planning");
    return data({
      message: "",
      data: res.data,
      error: null,
    });
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

  // check query if there is licensedId
  // if licensedId is present then get data of licensed from localstorage
  const licensedId = new URLSearchParams(url.search).get("licensedId");
  if (licensedId) {
    const licensedData = JSON.parse(localStorage.getItem("user")!);
    const postNames = await PostService.getPostNames();

    return {
      message: "",
      data: {
        allLicensed: [licensedData],
        postname: postNames.data.find(
          (postItem: { _id: string; name: string }) => postItem.name === post
        ),
      },
      error: null,
    };
  }

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
  const location = useLocation();
  let licensedId = new URLSearchParams(location.search).get("licensedId");

  let licensedContent = licensedId ? (
    <SelectItem defaultValue={licensedId} value={licensedId}>
      {`${data?.allLicensed[0].user.firstname} ${data?.allLicensed[0].user.lastname}`}
    </SelectItem>
  ) : (
    data?.allLicensed.map((licensed, idx: number) => (
      <SelectItem key={`licensed-${idx}`} value={licensed?._id} className="">
        {`${licensed.user.firstname} ${licensed.user.lastname}`}
      </SelectItem>
    ))
  );

  // console.log(data);

  // this custom hook serve for showing error message or navigate(-1) for success
  const { fetcher } = useFetcherEffect();

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
          <Select name="licensedId" defaultValue={licensedId ? licensedId : ""}>
            <SelectTrigger className="bg-white">
              <SelectValue
                placeholder={licensedId ? licensedId : "Selectionner un Membre"}
              />
            </SelectTrigger>
            <SelectContent
              className="relative z-[1300]"
              id="category"
              defaultValue={licensedId ? licensedId : ""}
            >
              <SelectGroup
                className="bg-white relative z-[1300]"
                defaultValue={licensedId ? licensedId : ""}
              >
                {licensedContent}
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
