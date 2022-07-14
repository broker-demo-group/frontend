import { API_URL } from "./constants";

export const LOGIN_STATUS = `${API_URL}/dashboard`;
export const LOGIN = `${API_URL}/restlogin`;
export const getCcyBalance = (ccy) => `${API_URL}/asset/balances?ccy=${ccy}`;
export const LOGOUT = "/logout";
