import Head from "next/head";
import { Box, Container } from "@mui/material";
import { DashboardLayout } from "../components/dashboard-layout";
import { FromCoinField } from "../components/convert/from-coin-field";
import { ToCoinField } from "../components/convert/to-coin-field";
import ConvertButton from "../components/convert/convert-button";
import IconButton from "@mui/material/IconButton";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import axios from "axios";
import { useEffect, useState, useReducer } from "react";
import {
  ASSET_CURRENCIES_INFO,
  SWAPPABLE_CURRENCIES,
} from "src/api/currencies";
import { AccountSelector } from "../components/convert/account-selector";
import { Estimator } from "../components/convert/estimator";
import Typography from "@mui/material/Typography";

function Convert(props) {
  const [swappableCoins, setSwappableCoins] = useState([
    { label: "BTC", logoLink: "" },
    { label: "ETH", logoLink: "" },
  ]);
  const [currenciesInfo, setCurrenciesInfo] = useState([]);
  const [swappableCurrencies, setSwappableCurrencies] = useState([]);
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  const [fromCoin, setFromCoin] = useState({ label: "BTC", logoLink: "" });
  const [toCoin, setToCoin] = useState({ label: "ETH", logoLink: "" });
  const [fundingBal, setFundingBal] = useState(0);
  const [tradingBal, setTradingBal] = useState(0);
  const [useFundingBal, setUseFundingBal] = useState(true);
  const [useTradingBal, setUseTradingBal] = useState(false);
  const [fromCoinValue, setFromCoinValue] = useState(0);
  const [toCoinValue, setToCoinValue] = useState(0);
  const [ratio, setRatio] = useState(0);

  useEffect(() => {
    const promises = [
      axios.get(ASSET_CURRENCIES_INFO),
      axios.get(SWAPPABLE_CURRENCIES),
    ];
    Promise.all(promises)
      .then((responses) => {
        const currenciesInfo = responses[0].data.data.map((e) => ({
          ccy: e.ccy,
          logoLink: e.logoLink,
        }));
        const swappableCurrencies = responses[1].data.data;
        const updatedSwappableCurrencies = swappableCurrencies.map((e) => ({
          label: e.ccy,
          logoLink: currenciesInfo.find((i) => e.ccy === i.ccy).logoLink,
        }));
        setSwappableCoins(updatedSwappableCurrencies);
        if (updatedSwappableCurrencies.length >= 2) {
          setFromCoin(updatedSwappableCurrencies[0]);
          setToCoin(updatedSwappableCurrencies[1]);
        }
      })
      .catch((err) => {
        console.log(`error at getting currencies info: ${err}`);
      });
  }, []);

  const swapCoins = () => {
    const a = fromCoin;
    const b = toCoin;
    setFromCoin(b);
    setToCoin(a);
  };

  const availBal =
    (useFundingBal ? Number(fundingBal) : 0) +
    (useTradingBal ? Number(tradingBal) : 0);

  return (
    <>
      <Head>
        <title>Convert | Broker Demo</title>
      </Head>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Typography variant="h2">Convert</Typography>
        </Box>
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
                onSetNewValue={setFromCoinValue}
                value={fromCoinValue}
              />
              <AccountSelector
                fromCoinLabel={fromCoin.label}
                setFundingBal={setFundingBal}
                setTradingBal={setTradingBal}
                useFundingBal={useFundingBal}
                useTradingBal={useTradingBal}
                setUseFundingBal={setUseFundingBal}
                setUseTradingBal={setUseTradingBal}
                fundingBal={fundingBal}
                tradingBal={tradingBal}
                ratio={ratio}
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
                ratio={ratio}
                onSetNewValue={setToCoinValue}
                value={toCoinValue}
                fromValue={fromCoinValue}
              />
              <Estimator
                fromCoinAmount={fromCoinValue}
                fromCoinLabel={fromCoin.label}
                toCoinLabel={toCoin.label}
                estimateQuoteCallback={setRatio}
              />
              <Box height={16} />
              <ConvertButton
                handleConfirmCallback={() => {
                    forceUpdate();
                }}
                handleCancelCallback={() => {}}
                amount={fromCoinValue}
                from={fromCoin.label}
                to={toCoin.label}
                useFunding={useFundingBal}
                useTrading={useTradingBal}
                fromCoinValue={fromCoinValue}
                toCoinValue={toCoinValue}
              />
            </Container>
          </Box>
        </Container>
      </Box>
    </>
  );
}

Convert.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Convert;
