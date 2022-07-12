import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import axios from "axios";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, fromCoinValue, toCoinValue, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const convertBodyMode = (useFunding, useTrading) => {
  if (useFunding && useTrading) {
    return "both";
  } else if (useFunding) {
    return "funding";
  } else {
    return "trading";
  }
};

const convertBody = (amount, from, to, useFunding, useTrading) => {
  return {
    amount: amount,
    fromCcy: from,
    toCcy: to,
    mode: convertBodyMode(useFunding, useTrading),
  };
};

export default function ConvertButton(props) {
  const { handleCancelCallback, handleConfirmCallback } = props;
  const [open, setOpen] = React.useState(false);
  const { amount, from, to, useFunding, useTrading } = props;
  const confirmConvert = () => {
    console.log(
      `body: ${JSON.stringify(
        convertBody(amount, from, to, useFunding, useTrading)
      )}`
    );
    axios
      .post(
        "/backendservice/asset/convert/trade",
        convertBody(amount, from, to, useFunding, useTrading)
      )
      .then((res) => console.log(`convert trade: ${JSON.stringify(res)}`))
      .catch((err) => console.log(`convert error: ${err}`));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    handleCancelCallback();
  };
  const handleConfirm = () => {
    setOpen(false);
    confirmConvert();
    handleConfirmCallback();
  };

  return (
    <div>
      <Button
        color="primary"
        variant="contained"
        fullWidth={true}
        onClick={handleClickOpen}
      >
        Convert
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Slippage Warning
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            There might be slippage in this trade. Confirm?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            variant="contained"
            color="primary"
            autoFocus
            onClick={handleConfirm}
          >
            Confirm
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
