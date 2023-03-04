import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import rootStore from '../../store/RootStore/instance';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type ModalProps = {
  elementId: string;

  visibleModal: {
    name: string;
    visible: boolean;
  };

  handleCloseModal: () => void;
}

const Modal: React.FC<ModalProps> = ({elementId, visibleModal, handleCloseModal }) => {

  return (
    <div>
      <Dialog
        open={visibleModal.visible}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseModal}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Вы уверены, что хотите "+visibleModal.name+"?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{
            handleCloseModal();
            if (visibleModal.name === "вернуть инструмент") {
              rootStore.tools.updateTool(elementId, false);
            } else if (visibleModal.name === "удалить") {
              rootStore.tools.deleteTool(elementId);
            }
          }}>{visibleModal.name}</Button>
          <Button onClick={handleCloseModal}>Отмена</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Modal;