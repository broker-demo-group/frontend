import { Box, Input, Typography, Autocomplete, TextField } from "@mui/material";

const ariaLabel = { "aria-label": "fromCurrency" };

const top100Films = [{ label: "BTC" }, { label: "ETH" }];

export const FromCoinField = (props) => (
  <Box>
    <Typography>From</Typography>
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        p: 2,
        justifyContent: "space-between",
        border: "1px solid grey",
      }}
    >
      <Input placeholder="0.00000" inputProps={ariaLabel} disableUnderline={true} />
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
          options={top100Films}
          defaultValue={top100Films[0]}
          sx={{ width: 150 }}
          renderInput={(params) => <TextField {...params} />}
        />
      </Box>
    </Box>
  </Box>
);
