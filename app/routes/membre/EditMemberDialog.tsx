import React from "react";
import Dialog from "~/components/common/dialog/Dialog";
import AppButton from "~/components/general/AppButton/AppButton";
import AppText from "~/components/general/AppText/AppText";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

const categories = [
  {
    id: 0,
    name: "Senior",
  },
  {
    id: 1,
    name: "Junior",
  },
  {
    id: 2,
    name: "U20",
  },
  {
    id: 3,
    name: "U16",
  },
  {
    id: "4",
    name: "U14",
  },
];

interface Props {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const EditMemberDialog = (props: Props) => {
  const { isOpen, setIsOpen } = props;

  return (
    <Dialog setIsOpen={setIsOpen} close={isOpen}>
      <AppText as="h1" weight="bold">
        Assigner a une catégorie
      </AppText>
      <div className="mt-4">
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Selectionner une catégorie" />
          </SelectTrigger>
          <SelectContent className="relative z-[1200]">
            {categories.map((category, idx) => (
              <SelectItem
                key={`category-${idx}`}
                value={category.id.toString()}
              >
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex gap-3 mt-4">
        <AppButton>Assigner</AppButton>
        <AppButton variant="outlined" onClick={() => setIsOpen(false)}>
          Annuler
        </AppButton>
      </div>
    </Dialog>
  );
};

export default EditMemberDialog;
