import React from "react";
import Dialog from "./dialog/Dialog";
import AppText from "../general/AppText/AppText";
import AppButton from "../general/AppButton/AppButton";

interface Props {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  setIsDeleteConfirmed: (value: boolean) => void;
}

function ConfirmationDialog(props: Props) {
  const { isOpen, setIsOpen, setIsDeleteConfirmed } = props;
  return (
    <Dialog setIsOpen={setIsOpen} close={isOpen}>
      <AppText weight="bold">Êtes-vous sûre de vouloir supprimer?</AppText>
      <div className="flex gap-3 mt-4">
        <AppButton
          onClick={() => {
            setIsDeleteConfirmed(true);
            setIsOpen(false);
          }}
        >
          Confirmer
        </AppButton>
        <AppButton
          variant="outlined"
          onClick={() => {
            setIsDeleteConfirmed(false);
            setIsOpen(false);
          }}
        >
          Annuler
        </AppButton>
      </div>
    </Dialog>
  );
}

export default ConfirmationDialog;
