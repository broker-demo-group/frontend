import { useEffect } from "react";
import axios from "axios";
import useSWR from "swr";

export default function useToken() {
  const { data: user } = useSWR("/api/user");
  const token = user?.token ?? "";
  useEffect(() => {
    axios.defaults.headers.common = {
      token: token,
    };
  }, [token]);
}
