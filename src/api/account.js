import { API_URL } from "./constants";
import axios from "axios";

export const LOGIN_STATUS = `${API_URL}/dashboard`;

export const isLoggedIn = async () => {
  try {
    const data = await axios.get(LOGIN_STATUS);
    const status = data.data.status ?? "";
    return status === "success";
  } catch (err) {
    console.error(`Error with getting login status: ${err}`);
    return false;
  }
};

// export const LOGIN = `${API_URL}/restlogin`;
export const LOGIN = `${API_URL}/login`;

export const loginWithUserAndPassword = async (user, password) => {
  try {
    const res = await axios.post(`${LOGIN}?username=${user}&password=${password}`);
    const token = res.headers["token"] ?? "";

    if (token === "") {
      console.log(res);
      return { status: "failed", message: "No token received" };
    }
    return { status: "success", token: token };
  } catch (err) {
    return { status: "failed", message: err };
  }
};

export const getCcyBalance = (ccy) => `${API_URL}/asset/balances?ccy=${ccy}`;
export const LOGOUT = `${API_URL}/logout`;

export const logout = async () => {
  if (await isLoggedIn()) {
    try {
      const response = await axios.post(LOGOUT);
      return response.data?.code === "0";
    } catch (err) {
      console.log(`error at logging out: ${err}`);
      return false;
    }
  }
  return true;
};
