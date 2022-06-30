import Head from "next/head";
import { Box, Checkbox, Container, FormControlLabel, FormGroup, Typography } from "@mui/material";
import { DashboardLayout } from "../components/dashboard-layout";
import { FromCoinField } from "../components/convert/from-coin-field";
import { ToCoinField } from "../components/convert/to-coin-field";
import ConvertButton from "../components/convert/convert-button";
import IconButton from "@mui/material/IconButton";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import { useState } from "react";

const Customers = () => {
  const swappableCoins = ["BTC", "ETH"];
  const [fromCoin, setFromCoin] = useState("BTC");
  const [toCoin, setToCoin] = useState("ETH");
  const swapCoins = () => {
    const a = fromCoin;
    const b = toCoin;
    setFromCoin(b);
    setToCoin(a);
  };

  return (
    <>
      <Head>
        <title>Convert</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <Box
            component="main"
            sx={{
              alignItems: "center",
              display: "flex",
              flexGrow: 1,
              minHeight: "100%",
            }}
          >
            <Container maxWidth="sm">
              <FromCoinField
                coinSelected={fromCoin}
                swappableCoins={swappableCoins}
                onSelectNewCoin={setFromCoin}
              />
              <Typography variant="caption">Available: 0.000000</Typography>
              <FormGroup>
                <FormControlLabel
                  fontSize="small"
                  control={
                    <Checkbox size="small" disableRipple defaultChecked sx={{ height: 10 }} />
                  }
                  label={<Typography fontSize="small">Funding account: 0.0000</Typography>}
                />
                <FormControlLabel
                  fontSize="small"
                  control={<Checkbox size="small" sx={{ height: 10 }} disableRipple />}
                  label={<Typography fontSize="small">Trading account: 0.0000</Typography>}
                />
              </FormGroup>
              <Box height={16} />
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <IconButton
                  aria-label="switch-currencies"
                  // disableRipple
                  // disableFocusRipple
                  // style={{ backgroundColor: "transparent" }}
                  onClick={swapCoins}
                >
                  <SwapVertIcon />
                </IconButton>
              </Box>
              <ToCoinField
                coinSelected={toCoin}
                swappableCoins={swappableCoins}
                onSelectNewCoin={setToCoin}
              />
              <Typography variant="caption">Estimated: 1 ETH = 0.03 BTC</Typography>

              <Box height={16} />
              <ConvertButton handleConfirmCallback={() => {}} handleCancelCallback={() => {}} />
            </Container>
          </Box>
        </Container>
      </Box>
    </>
  );
};
Customers.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Customers;
