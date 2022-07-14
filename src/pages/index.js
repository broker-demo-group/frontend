import { useEffect, useState, useCallback } from "react";
import Head from "next/head";
import { Box, Container } from "@mui/material";
import { DashboardLayout } from "../components/dashboard-layout";
import { FromCoinField } from "../components/convert/from-coin-field";
import { ToCoinField } from "../components/convert/to-coin-field";
import ConvertButton from "../components/convert/convert-button";
import IconButton from "@mui/material/IconButton";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import axios from "axios";
import { ASSET_CURRENCIES_INFO, SWAPPABLE_CURRENCIES } from "src/api/currencies";
import { AccountSelector } from "../components/convert/account-selector";
import { Estimator } from "../components/convert/estimator";
import ConvertContext from "../components/convert/context";
import Typography from "@mui/material/Typography";
import { getCcyBalance } from "../api/account";

function Convert(props) {
  const [swappableCoins, setSwappableCoins] = useState([
    { label: "BTC", logoLink: "" },
    { label: "ETH", logoLink: "" },
  ]);
  const [fromCoin, setFromCoin] = useState({ label: "BTC", logoLink: "" });
  const [toCoin, setToCoin] = useState({ label: "ETH", logoLink: "" });
  const [fundingBal, setFundingBal] = useState(0);
  const [tradingBal, setTradingBal] = useState(0);
  const [useFundingBal, setUseFundingBal] = useState(true);
  const [useTradingBal, setUseTradingBal] = useState(false);
  const [fromCoinValue, setFromCoinValue] = useState(0);
  const [toCoinValue, setToCoinValue] = useState(0);
  const [ratio, setRatio] = useState(0);

  console.log(ratio);

  const updateBalance = useCallback(() => {
    axios
      .get(getCcyBalance(fromCoin.label))
      .then((res) => {
        const { funding, trading } = res.data.data;
        setFundingBal(funding ?? 0);
        setTradingBal(trading ?? 0);
      })
      .catch((err) => {
        console.error(`error with getting balance: ${err}`);
      });
  }, [fromCoin, setFundingBal, setTradingBal]);

  useEffect(() => {
    const promises = [axios.get(ASSET_CURRENCIES_INFO), axios.get(SWAPPABLE_CURRENCIES)];
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
    (useFundingBal ? Number(fundingBal) : 0) + (useTradingBal ? Number(tradingBal) : 0);

  return (
    <ConvertContext.Provider
      value={{
        availBal: availBal,
        fromCoin: fromCoin,
        setFromCoin: setFromCoin,
        toCoin: toCoin,
        setToCoin: setToCoin,
        fundingBal: fundingBal,
        setFundingBal: setFundingBal,
        tradingBal: tradingBal,
        setTradingBal: setTradingBal,
        useTradingBal: useTradingBal,
        setUseTradingBal: setUseTradingBal,
        useFundingBal: useFundingBal,
        setUseFundingBal: setUseFundingBal,
        swappableCoins: swappableCoins,
        setSwappableCoins: setSwappableCoins,
        fromCoinValue: fromCoinValue,
        setFromCoinValue: setFromCoinValue,
        toCoinValue: toCoinValue,
        setToCoinValue: setToCoinValue,
        ratio: ratio,
        setRatio: setRatio,
      }}
    >
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
              <Typography gutterBottom variant="h3">
                Convert
              </Typography>
              <FromCoinField />
              <AccountSelector updateBalance={updateBalance} />
              <Box height={16} />
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <IconButton aria-label="switch-currencies" onClick={swapCoins}>
                  <SwapVertIcon />
                </IconButton>
              </Box>
              <ToCoinField />
              <Estimator />
              <Box height={16} />
              <ConvertButton
                handleConfirmCallback={() => {
                  setTimeout(updateBalance, 2000);
                }}
                handleCancelCallback={() => {}}
              />
            </Container>
          </Box>
        </Container>
      </Box>
    </ConvertContext.Provider>
  );
}

Convert.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Convert;
