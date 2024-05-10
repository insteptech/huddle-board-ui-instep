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
        open={isModalOpen}
        TransitionComponent={DeleteTransition}
        keepMounted
        onClose={modalToggle}
        aria-describedby="alert-dialog-slide-description"
      >
        <Container
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "10px",
          }}
        >
          <DeleteOutlineOutlinedIcon color="warning" />
          <CloseIcon onClick={modalToggle} />
        </Container>
        <DialogTitle>{"Are you sure?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            You want to delete this saved filter.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ marginBottom: "10px" }}>
          <Button
            onClick={modalToggle}
            variant="contained"
            sx={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #D0D5DD",
              color: "#344054",
              width: "50%",
              textTransform: "capitalize",
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={modalToggle}
            variant="contained"
            sx={{
              backgroundColor: "#D92D20",
              border: "1px solid #D92D20",
              color: "#FFFFFF",
              width: "50%",
              textTransform: "capitalize",
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default DeleteFilterModal;
