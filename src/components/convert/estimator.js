import { useEffect, useState } from "react";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import axios from "axios";
import Typography from "@mui/material/Typography";
import { ESTIMATE_QUOTE } from "src/api/convert";

function estimateQuoteBody(fromCoin, toCoin) {
  return {
    amount: "1",
    fromCcy: toCoin,
    toCcy: fromCoin,
  };
}

export const Estimator = (props) => {
  const { fromCoinLabel, toCoinLabel } = props;
  const [ratio, setRatio] = useState(-1);

  useEffect(() => {
    console.log(ESTIMATE_QUOTE);
    axios
      .post(ESTIMATE_QUOTE, estimateQuoteBody(fromCoinLabel, toCoinLabel))
      .then((res) => {
        const dataOutput = JSON.parse(res.data.data);
        console.log();
        console.log(dataOutput);
        console.log(dataOutput.quoteSz);
        if (res.code === 0) {
          setRatio(res.data.quoteSz);
        } else {
          setRatio("error ");
        }
      })
      .catch((err) => {
        console.log(`error at estimate quote: ${err}`);
        setRatio("error ");
      });
  }, [fromCoinLabel]);

  return (
    <Typography variant="caption">
      Estimated: 1 {toCoinLabel} = {ratio} {fromCoinLabel}
    </Typography>
  );
};
