import { API_URL } from './constants';

export const getCcyBalance = (ccy, account = null) => `${API_URL}/asset/balances?ccy=${ccy}`;
export const LOGOUT = '/logout';