import { useEffect, useCallback, useContext } from "react";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import Typography from "@mui/material/Typography";
import { numberShortener } from "../../lib/numberShortener";
import { getCcyBalance } from "../../api/account";
import ConvertContext from "../convert/context";
import axios from "axios";

export const AccountSelector = (props) => {
  const {
    fromCoin,
    useFundingBal,
    setUseFundingBal,
    useTradingBal,
    setUseTradingBal,
    fundingBal,
    setFundingBal,
    tradingBal,
    setTradingBal,
  } = useContext(ConvertContext);
  const fromCoinLabel = fromCoin.label ?? "";
  const { updateBalance } = props;

  useEffect(() => {
    updateBalance();
  }, [fromCoinLabel, updateBalance]);

  useEffect(() => {
    updateBalance();
    const interval = setInterval(() => {
      updateBalance();
    }, 10000);
    return () => clearInterval(interval);
  }, [updateBalance]);

  const stringFundBal = numberShortener(fundingBal);
  const stringTradBal = numberShortener(tradingBal);
  const available =
    (useFundingBal ? Number(fundingBal) : 0) + (useTradingBal ? Number(tradingBal) : 0);
  const stringAvail = numberShortener(available);

  return (
    <>
      <Typography variant="caption">
        Available: {stringAvail} {fromCoinLabel}
      </Typography>
      <FormGroup>
        <FormControlLabel
          fontSize="small"
          control={
            <Checkbox
              size="small"
              disableRipple
              defaultChecked
              sx={{ height: 10 }}
              onChange={(event) => setUseFundingBal(event.target.checked)}
            />
          }
          label={
            <Typography fontSize="small">
              Funding account: {stringFundBal} {fromCoinLabel}
            </Typography>
          }
        />
        <FormControlLabel
          fontSize="small"
          control={
            <Checkbox
              size="small"
              sx={{ height: 10 }}
              disableRipple
              onChange={(event) => setUseTradingBal(event.target.checked)}
            />
          }
          label={
            <Typography fontSize="small">
              Trading account: {stringTradBal} {fromCoinLabel}
            </Typography>
          }
        />
      </FormGroup>
    </>
  );
};
