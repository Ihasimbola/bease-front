import Dialog from "~/components/common/dialog/Dialog";
import AppButton from "~/components/general/AppButton/AppButton";
import AppText from "~/components/general/AppText/AppText";

interface Props {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

function DeleteConfirmationDialog(props: Props) {
  const { isOpen, setIsOpen } = props;

  return (
    <Dialog setIsOpen={setIsOpen} close={isOpen}>
      <AppText weight="bold">Confirmer la suppression</AppText>
      <div className="flex gap-3 mt-4">
        <AppButton>Confirmer</AppButton>
        <AppButton variant="outlined" onClick={() => setIsOpen(false)}>
          Annuler
        </AppButton>
      </div>
    </Dialog>
  );
}

export default DeleteConfirmationDialog;
