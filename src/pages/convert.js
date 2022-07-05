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
import { ASSET_CURRENCIES_INFO, SWAPPABLE_CURRENCIES } from "src/api/currencies";
import { AccountSelector } from "../components/convert/account-selector";
import { Estimator } from "../components/convert/estimator";

function Customers(props) {
  console.log(props);
  const { currenciesInfo, swappableCurrencies } = props;
  const [swappableCoins, setSwappableCoins] = useState([
    { label: "BTC", logoLink: "" },
    { label: "ETH", logoLink: "" },
  ]);
  const [fromCoin, setFromCoin] = useState({ label: "BTC", logoLink: "" });
  const [toCoin, setToCoin] = useState({ label: "ETH", logoLink: "" });
  const [availBal, setAvailBal] = useState(0);

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
                availBal={availBal}
                swappableCoins={swappableCoins}
                onSelectNewCoin={setFromCoin}
              />
              <AccountSelector
                balance={availBal}
                fromCoinLabel={fromCoin.label}
                setAvailBal={setAvailBal}
              />
              <Box height={16} />
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <IconButton aria-label="switch-currencies" onClick={swapCoins}>
                  <SwapVertIcon />
                </IconButton>
              </Box>
              <ToCoinField
                coinSelected={toCoin}
                swappableCoins={swappableCoins}
                onSelectNewCoin={setToCoin}
              />
              <Estimator fromCoinLabel={fromCoin.label} toCoinLabel={toCoin.label} />
              <Box height={16} />
              <ConvertButton handleConfirmCallback={() => {}} handleCancelCallback={() => {}} />
            </Container>
          </Box>
        </Container>
      </Box>
    </>
  );
}

Customers.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export const getServerSideProps = async (ctx) => {
  const promises = [axios.get(ASSET_CURRENCIES_INFO), axios.get(SWAPPABLE_CURRENCIES)];
  try {
    const responses = await Promise.all(promises);
    return {
      props: {
        currenciesInfo: responses[0].data.map((e) => ({ ccy: e.ccy, logoLink: e.logoLink })),
        swappableCurrencies: responses[1].data,
      },
    };
  } catch {
    return { props: { currenciesInfo: "failed", swappableCurrencies: "failed" } };
  }
};

export default Customers;
