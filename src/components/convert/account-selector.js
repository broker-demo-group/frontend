import { useEffect, useState } from "react";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import Typography from "@mui/material/Typography";
import { getCcyBalance } from "../../api/account";
import axios from "axios";

export const AccountSelector = (props) => {
  const { balance, fromCoinLabel = "", setAvailBal } = props;
  //   const [balance, setBalance] = useState(0.0);

  useEffect(() => {
    axios
      .get(getCcyBalance(fromCoinLabel))
      .then((res) => {
        const { availBal } = res.data[0];
        setAvailBal(availBal ?? 0.0);
      })
      .catch((err) => {
        console.error(`error with getting balance: ${err}`);
      });
  }, [fromCoinLabel]);

  return (
    <>
      <Typography variant="caption">
        Available: {balance} {fromCoinLabel}
      </Typography>
      <FormGroup>
        <FormControlLabel
          fontSize="small"
          control={<Checkbox size="small" disableRipple defaultChecked sx={{ height: 10 }} />}
          label={<Typography fontSize="small">Funding account: 0.0000</Typography>}
        />
        <FormControlLabel
          fontSize="small"
          control={<Checkbox size="small" sx={{ height: 10 }} disableRipple />}
          label={<Typography fontSize="small">Trading account: 0.0000</Typography>}
        />
      </FormGroup>
    </>
  );
};
