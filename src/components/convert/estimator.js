import { useEffect, useState, useContext, useCallback } from "react";
import axios from "axios";
import Typography from "@mui/material/Typography";
import { ESTIMATE_QUOTE } from "src/api/convert";
import { numberShortener } from "../../lib/numberShortener";
import ConvertContext from "../convert/context";

function estimateQuoteBody(fromCoin, toCoin, amount = 0.01) {
  return {
    amount: amount === 0 ? 0.01 : amount,
    fromCcy: fromCoin,
    toCcy: toCoin,
  };
}

export const Estimator = (props) => {
  const {
    fromCoinValue: fromCoinAmount,
    fromCoin,
    toCoin,
    setRatio: estimateQuoteCallback,
  } = useContext(ConvertContext);

  const fromCoinLabel = fromCoin.label;
  const toCoinLabel = toCoin.label;

  const [ratio, setRatio] = useState(-1);

  const updatePriceQuote = useCallback(() => {
    const numCoinAmount = Number(fromCoinAmount);
    axios
      .post(ESTIMATE_QUOTE, estimateQuoteBody(fromCoinLabel, toCoinLabel, fromCoinAmount))
      .then((res) => {
        const dataOutput = res.data;
        if (dataOutput.code !== "0") {
          setRatio("error");
          estimateQuoteCallback(0);
          return;
        }
        const base = dataOutput.data.baseCcy;
        const toPrice = base === toCoinLabel ? dataOutput.data.baseSz : dataOutput.data.quoteSz;
        const fromPrice = base === fromCoinLabel ? dataOutput.data.baseSz : dataOutput.data.quoteSz;
        const r = fromPrice / toPrice;
        console.log(`toPrice: ${toPrice} fromPrice: ${fromPrice} r: ${r}`);
        if (!r) {
          setRatio("error");
          estimateQuoteCallback(0);
          return;
        }
        setRatio(r);
        estimateQuoteCallback(r);
      })
      .catch((err) => {
        console.log(`error at estimate quote: ${err}`);
        setRatio("error");
        estimateQuoteCallback(0);
      });
  }, [estimateQuoteCallback, fromCoinAmount, fromCoinLabel, toCoinLabel]);

  useEffect(() => {
    updatePriceQuote();
    const interval = setInterval(updatePriceQuote, 3000);
    return () => clearInterval(interval);
  }, [updatePriceQuote]);

  const stringRatio = numberShortener(ratio);
  return (
    <>
      {ratio !== "error" && (
        <Typography variant="caption">
          Estimated: 1 {toCoinLabel} = {stringRatio} {fromCoinLabel}
        </Typography>
      )}
      {ratio === "error" && (
        <Typography variant="caption" color="red">
          Error in getting quote
        </Typography>
      )}
    </>
  );
};
