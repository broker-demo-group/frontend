import Head from "next/head";
import { Box, Checkbox, Container, FormControlLabel, FormGroup, Typography } from "@mui/material";
import { DashboardLayout } from "../components/dashboard-layout";
import { FromCoinField } from "../components/convert/from-coin-field";
import { ToCoinField } from "../components/convert/to-coin-field";
import ConvertButton from "../components/convert/convert-button";
import IconButton from "@mui/material/IconButton";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import axios from "axios";
import { useEffect, useState } from "react";
import { API_TEST } from "../api/constants";
import { ASSET_CURRENCIES_INFO, SWAPPABLE_CURRENCIES } from "src/api/currencies";

const Customers = (props) => {
  const { currenciesInfo, swappableCurrencies } = props;
  const [swappableCoins, setSwappableCoins] = useState([
    { label: "BTC", logoLink: "" },
    { label: "ETH", logoLink: "" },
  ]);
  const [fromCoin, setFromCoin] = useState({ label: "BTC", logoLink: "" });
  const [toCoin, setToCoin] = useState({ label: "ETH", logoLink: "" });

  useEffect(() => {
    console.log(`swappableCurrencies: ${JSON.stringify(swappableCurrencies)}`);
    const updatedSwappableCurrencies = swappableCurrencies.map((e) => ({
      label: e.ccy,
      logoLink: currenciesInfo.find((i) => e.ccy === i.ccy).logoLink,
    }));
    setSwappableCoins(updatedSwappableCurrencies);
    setFromCoin(updatedSwappableCurrencies[0]);
    setToCoin(updatedSwappableCurrencies[1]);
  }, []);

  // useEffect(() => {
  //   const config = {
  //     headers: {
  //       "Access-Control-Allow-Origin": "*",
  //     },
  //   };
  //   console.log(`useEffect`);
  //   axios.defaults.headers.get["Access-Control-Allow-Origin"] = "*";
  //   console.log(`enable cors`);
  //   axios
  //     .get(sysTest, config)
  //     .then((response) => console.log(response))
  //     .catch((e) => console.log(`ERRROR: ${e}`));
  // }, []);

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

Customers.getInitialProps = async (ctx) => {
  const promises = [axios.get(ASSET_CURRENCIES_INFO), axios.get(SWAPPABLE_CURRENCIES)];
  try {
    const responses = await Promise.all(promises);

    // return { currenciesInfo: responses[0].data, swappableCurrencies: "test" };
    // const res = await axios.get("https://randomuser.me/api/?results=5");
    // console.log(ASSET_CURRENCIES_INFO);
    // const res = await axios.get(ASSET_CURRENCIES_INFO);

    return {
      currenciesInfo: responses[0].data.map((e) => ({ ccy: e.ccy, logoLink: e.logoLink })),
      swappableCurrencies: responses[1].data,
    };
  } catch {
    return { currenciesInfo: "failed", swappableCurrencies: "failed" };
  }
};

export default Customers;
