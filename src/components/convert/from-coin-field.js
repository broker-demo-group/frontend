import { useState, useContext, useCallback, useEffect } from "react";
import {
  Autocomplete,
  Button,
  Box,
  Input,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import ConvertContext from "../convert/context";

const ariaLabel = { "aria-label": "fromCurrency" };

export const FromCoinField = (props) => {
  const {
    availBal,
    fromCoin: coinSelected,
    swappableCoins,
    setFromCoinValue: onSetNewValue,
    setFromCoin: onSelectNewCoin,
    ratio,
    fromCoinValue: stringValue,
    coinLimits,
  } = useContext(ConvertContext);

  const [isWithinLimits, setIsWithinLimits] = useState(true);
  const [isWithinAvailBal, setIsWithinAvailBal] = useState(true);
  const [minRequired, setMinRequired] = useState(0);
  const [maxRequired, setMaxRequired] = useState(99999);

  useEffect(() => {
    const c = coinLimits.filter((coin) => coin.ccy === coinSelected.label);
    if (c.length !== 0 && c[0].min !== undefined && c[0].max !== undefined) {
      setMinRequired(c[0].min);
      setMaxRequired(c[0].max);
    } else {
      setMinRequired(0);
      setMaxRequired(99999);
    }
  }, [coinSelected, coinLimits]);

  const validateInput = useCallback(
    (val) => {
      const num = Number(val);
      if (Number.isFinite(num)) {
        const isWithinLimits = num >= minRequired && num <= maxRequired;
        setIsWithinLimits(isWithinLimits);
        const isWithinBal = num <= availBal;
        setIsWithinAvailBal(isWithinBal);
      }
    },
    [minRequired, maxRequired, availBal]
  );

  useEffect(() => {
    validateInput(stringValue);
  }, [availBal, stringValue, validateInput]);

  const inputOnChange = useCallback(
    (event) => {
      onSetNewValue(event.target.value);
      validateInput(event.target.value);
    },
    [onSetNewValue, validateInput]
  );

  return (
    <Box>
      <Typography variant="body2">From</Typography>
      <Box
        border={`1px solid ${isWithinLimits ? "grey" : "red"}`}
        sx={{
          display: "flex",
          flexDirection: "row",
          p: 2,
          justifyContent: "space-between",
        }}
      >
        <Input
          value={stringValue}
          placeholder="0.00000"
          inputProps={ariaLabel}
          disableUnderline={true}
          onChange={inputOnChange}
          fullWidth
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <Button variant="text" onClick={() => onSetNewValue(availBal)}>
            MAX
          </Button>

          <Typography sx={{ marginX: 1 }}>|</Typography>

          <Autocomplete
            disablePortal
            disableClearable
            id="combo-box-demo"
            options={swappableCoins}
            renderOption={(props, option) => (
              <Box component="li" sx={{ "& > img": { mr: 2, flexShrink: 0 } }} {...props}>
                <img loading="lazy" width="20" src={option.logoLink} alt="" />
                {option.label}
              </Box>
            )}
            value={coinSelected}
            sx={{ width: 150 }}
            renderInput={(params) => {
              params.InputProps.startAdornment = (
                <InputAdornment position="start">
                  <img loading="lazy" width="20" src={coinSelected.logoLink} alt="" />
                </InputAdornment>
              );
              return <TextField {...params} />;
            }}
            onChange={(event, value) => onSelectNewCoin(value)}
          />
        </Box>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        {!isWithinLimits && (
          <Typography gutterBottom variant="caption" color="red">
            Quantity needs to be between {minRequired} and {maxRequired}
          </Typography>
        )}
        {!isWithinAvailBal && (
          <Typography gutterBottom variant="caption" color="red">
            Insufficient balance
          </Typography>
        )}
      </Box>
    </Box>
  );
};
