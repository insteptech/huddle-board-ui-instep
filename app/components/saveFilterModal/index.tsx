import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import CloseIcon from "@mui/icons-material/Close";
import { Container } from "@mui/material";
import OutlinedFlagOutlinedIcon from "@mui/icons-material/OutlinedFlagOutlined";
import TextField from "@mui/material/TextField";

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
        open={isModalOpen}
        TransitionComponent={SaveTransition}
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
          <OutlinedFlagOutlinedIcon
            fontSize="large"
            sx={{
              border: "1px solid #EAECF0",
              padding: "7px",
              borderRadius: "5px",
            }}
          />
          <CloseIcon onClick={modalToggle} />
        </Container>

        <DialogTitle>{"Save a filter"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Using a set of filters regularly, save it to reuse.
          </DialogContentText>
        </DialogContent>
        <Container>
          Filter
          <TextField
            value={filterName}
            fullWidth
            id="fullWidth"
            size="small"
            placeholder="AWV+PVD"
            onChange={setFilterName}
          />
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
                backgroundColor: "#17236D",
                border: "1px solid #17236D",
                color: "#FFFFFF",
                width: "50%",
                textTransform: "capitalize",
              }}
              disabled={filterName.length === 0}
            >
              Save
            </Button>
          </DialogActions>
        </Container>
      </Dialog>
    </React.Fragment>
  );
};

export default SaveFilterModal;
