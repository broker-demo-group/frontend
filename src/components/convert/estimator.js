import { useEffect, useState } from "react";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { ESTIMATE_QUOTE } from "src/api/convert";

function estimateQuoteBody(fromCoin, toCoin) {
  console.log(fromCoin);
  console.log(toCoin);
  return {
    baseCcy: fromCoin,
    quoteCcy: toCoin,
    side: "buy",
    rfqSz: "1",
    rfqSzCcy: toCoin,
  };
}

export const Estimator = (props) => {
  const { fromCoinLabel, toCoinLabel } = props;
  const [ratio, setRatio] = useState(-1);

  useEffect(() => {
    fetch(ESTIMATE_QUOTE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(estimateQuoteBody(fromCoinLabel, toCoinLabel)),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Success!");
        console.log(data);
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  }, [fromCoinLabel]);

  return (
    <Typography variant="caption">
      Estimated: 1 {toCoinLabel} = {ratio} {fromCoinLabel}
    </Typography>
  );
};
