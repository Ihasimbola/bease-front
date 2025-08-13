import { Send } from "lucide-react";
import React from "react";
import Dialog from "~/components/common/dialog/Dialog";
import AppButton from "~/components/general/AppButton/AppButton";
import AppText from "~/components/general/AppText/AppText";
import { Input } from "~/components/ui/input";

interface Props {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

function AddMemberDialog(props: Props) {
  const { isOpen, setIsOpen } = props;

  return (
    <Dialog setIsOpen={setIsOpen} close={isOpen}>
      <AppText weight="bold">Ajout d' un membre</AppText>
      <div className="mt-4">
        <label htmlFor="email">
          <AppText size="xs">Email du nouveau membre</AppText>
        </label>
        <Input
          type="text"
          id="email"
          placeholder="john@gmail.com"
          className="mt-1"
        />
      </div>
      <div className="flex gap-3 mt-4">
        <AppButton>
          <Send size={16} />
          Envoyer la demande
        </AppButton>
        <AppButton variant="outlined" onClick={() => setIsOpen(false)}>
          Annuler
        </AppButton>
      </div>
    </Dialog>
  );
}

export default AddMemberDialog;
