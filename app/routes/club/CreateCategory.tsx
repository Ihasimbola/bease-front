import { redirect, useNavigate } from "react-router";
import type { Route } from "./+types/CreateCategory";
import Dialog from "~/components/common/dialog/Dialog";
import AppText from "~/components/general/AppText/AppText";
import { Form } from "react-router";
import { Input } from "~/components/ui/input";
import AppButton from "~/components/general/AppButton/AppButton";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { CategoryService } from "~/services/CategoryService";

export async function clientAction({ request, params }: Route.ActionArgs) {
  console.log(params.id);
  const formData = await request.formData();
  const categoryName = formData.get("name");

  if (!categoryName) {
    return;
  }

  const res = await CategoryService.create({
    name: categoryName.toString(),
  });

  return redirect("/club/edit" + params.id);
}

export default function CreateCategory({ params }: Route.ClientLoaderArgs) {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();
  console.log(params.id);

  return (
    <Dialog className="flex flex-col" close={isOpen} setIsOpen={setIsOpen}>
      <AppText color="black" weight="bold" as="h1">
        Creation de categorie
      </AppText>
      <Form method="post">
        <div className="mt-6">
          <label htmlFor="category">
            <AppText color="black">Nom de la categorie</AppText>
          </label>
          <Input
            type="text"
            id="category"
            placeholder="U17"
            className="mt-2"
            name="name"
          />
        </div>
        <div className="flex gap-6 mt-4">
          <AppButton type="submit">
            <PlusIcon />
            Ajouter
          </AppButton>
          <AppButton
            type="button"
            variant="outlined"
            onClick={() => navigate(-1)}
          >
            Annuler
          </AppButton>
        </div>
      </Form>
    </Dialog>
  );
}
