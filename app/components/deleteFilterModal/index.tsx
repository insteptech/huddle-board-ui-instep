import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CloseIcon from "@mui/icons-material/Close";
import { Container } from "@mui/material";
import { ButtonCancel, DialogActionsMain, DialogContentTextInner, DialogContentTexts, DialogTitleInner, ModalHeader,ButtonDelete } from "@/app/styles/customStyle";

const DeleteTransition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DeleteFilterModal = (props: any) => {
  const { isModalOpen, modalToggle } = props;

  return (
    <React.Fragment>
      <Dialog
      sx={{ zIndex: "99999" }}
      PaperProps={{ sx: { borderRadius: "12px", width: "400px" } }}
        open={isModalOpen}
        TransitionComponent={DeleteTransition}
        keepMounted
        onClose={modalToggle}
        aria-describedby="alert-dialog-slide-description"
      >
         <ModalHeader>
          <DeleteOutlineOutlinedIcon color="warning" />
          <CloseIcon sx={{ cursor: "pointer" }} onClick={modalToggle} />
          
          </ModalHeader>

          
        
        <DialogContent sx={{ paddingBottom:'0', }}>
        <DialogTitleInner>{"Are you sure?"}</DialogTitleInner>

         <DialogContentTexts id="alert-dialog-slide-description">
         <DialogContentTextInner>
            You want to delete this saved filter.
          </DialogContentTextInner>
          </DialogContentTexts>
        </DialogContent>


        <Container>
        <DialogActionsMain >
          <ButtonCancel
            onClick={modalToggle} >
            Cancel
          </ButtonCancel> 
          <ButtonDelete
            onClick={modalToggle}
          >
            Delete
          </ButtonDelete>
        </DialogActionsMain>
      </Container>

      
      </Dialog>
    </React.Fragment>
  );
};

export default DeleteFilterModal;
