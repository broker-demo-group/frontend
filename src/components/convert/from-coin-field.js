import { Autocomplete, Box, Input, InputAdornment, TextField, Typography } from "@mui/material";

const ariaLabel = { "aria-label": "fromCurrency" };

export const FromCoinField = (props) => {
  const { availBal, coinSelected, swappableCoins, onSelectNewCoin } = props;
  return (
    <Box>
      <Typography variant="body2">From</Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          p: 2,
          justifyContent: "space-between",
          border: "1px solid grey",
        }}
      >
        <Input error={true} placeholder="0.00000" inputProps={ariaLabel} disableUnderline={true} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <Typography variant="button" align="right">
            Max
          </Typography>
          <Typography sx={{ marginX: 1 }}>|</Typography>

          <Autocomplete
            disablePortal
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
    </Box>
  );
};
