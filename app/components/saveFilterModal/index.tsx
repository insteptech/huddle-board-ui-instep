import * as React from "react";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import CloseIcon from "@mui/icons-material/Close";
import { Container } from "@mui/material";
import AssistantPhotoOutlinedIcon from "@mui/icons-material/AssistantPhotoOutlined";

import {
  ModalHeader,
  ModalHeaderIcon,
  DialogTitleInner,
  DialogContentTextInner,
  DialogContent,
  InputTitleInner,
  DialogActionsMain,
  ButtonSave,
  ButtonCancel,
  TextFieldInput,
  DialogContentTexts,
} from "../../styles/customStyle";

const SaveTransition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const SaveFilterModal = (props: any) => {
  const { isModalOpen, modalToggle, filterName, setFilterName } = props;

  return (
    <React.Fragment>
      <Dialog
        sx={{ zIndex: "99999" }}
        PaperProps={{ sx: { borderRadius: "12px", width: "400px" } }}
        open={isModalOpen}
        TransitionComponent={SaveTransition}
        keepMounted
        onClose={modalToggle}
        aria-describedby="alert-dialog-slide-description"
      >
        <ModalHeader>
          <ModalHeaderIcon>
            <AssistantPhotoOutlinedIcon />
          </ModalHeaderIcon>
          <CloseIcon sx={{ cursor: "pointer" }} onClick={modalToggle} />
        </ModalHeader>

        <DialogContent>
          <DialogTitleInner>{"Save a filter"}</DialogTitleInner>

          <DialogContentTexts id="alert-dialog-slide-description">
            <DialogContentTextInner>
              Using a set of filters regularly, save it to reuse.
            </DialogContentTextInner>
          </DialogContentTexts>
        </DialogContent>

        <Container>
          <InputTitleInner>Filter name</InputTitleInner>
          <TextFieldInput
            value={filterName}
            id="fullWidth"
            placeholder="AWV+PVD"
            onChange={setFilterName}
          />
          <DialogActionsMain>
            <ButtonCancel onClick={modalToggle}>Cancel</ButtonCancel>
            <ButtonSave
              onClick={modalToggle}
              disabled={filterName.length === 0}
            >
              Save
            </ButtonSave>
          </DialogActionsMain>
        </Container>
      </Dialog>
    </React.Fragment>
  );
};

export default SaveFilterModal;
