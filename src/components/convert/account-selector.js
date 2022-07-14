import { useEffect, useCallback } from "react";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import Typography from "@mui/material/Typography";
import { numberShortener } from "../../lib/numberShortener";
import { getCcyBalance } from "../../api/account";
import axios from "axios";

// export const getCcyBalance = (ccy, account = null) => `/backendservice/asset/balances?ccy=${ccy}`;
export const AccountSelector = (props) => {
  const {
    fromCoinLabel = "",
    useFundingBal,
    setUseFundingBal,
    useTradingBal,
    setUseTradingBal,
    fundingBal,
    setFundingBal,
    tradingBal,
    setTradingBal,
  } = props;

  const updateBalance = useCallback(() => {
    axios
      .get(getCcyBalance(fromCoinLabel))
      .then((res) => {
        //   console.log(res.data.data);
        const { funding, trading } = res.data.data;
        setFundingBal(funding ?? 0);
        setTradingBal(trading ?? 0);
      })
      .catch((err) => {
        console.error(`error with getting balance: ${err}`);
      });
  }, [fromCoinLabel, setFundingBal, setTradingBal]);

  useEffect(() => {
    updateBalance();
  }, [fromCoinLabel, updateBalance]);

  useEffect(() => {
    updateBalance();
    const interval = setInterval(() => {
      updateBalance();
    }, 10000);
    return () => clearInterval(interval);
  }, []);

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
