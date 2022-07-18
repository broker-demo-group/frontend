import Head from "next/head";
import { CacheProvider } from "@emotion/react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { createEmotionCache } from "../utils/create-emotion-cache";
import { theme } from "../theme";
import fetchJson from "../lib/fetchJson";
import axiosRetry from "axios-retry";
import axios from "axios";
import { SWRConfig } from "swr";
import useToken from "src/lib/useToken";
import useUser from "../lib/useUser";

// if (IS_DEV) {
//   axios.defaults.headers.common = {
//     token: AUTH_TOKEN,
//   };
// }

const clientSideEmotionCache = createEmotionCache();

// axiosRetry(axios, {
//   retries: 3,
//   retryDelay: () => 2000,
//   onRetry: (retryCount) => console.log(`retryCount: ${retryCount}`),
// });

const App = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const { user } = useUser({});

  // if cookie has token, use it whenever we do axios requests
  useToken();

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Broker Demo</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <SWRConfig
            value={{
              fetcher: fetchJson,
              onError: (err) => {
                console.error(err);
              },
            }}
          >
            {getLayout(<Component {...pageProps} />)}
          </SWRConfig>
        </ThemeProvider>
      </LocalizationProvider>
    </CacheProvider>
  );
};

export default App;
