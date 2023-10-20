import Axios from "axios";
import { token } from "./constants";

export const api = Axios.create({
  baseURL: "http://localhost:3333", // -> Local
  headers: {
    Authorization: `Bearer ${token}`,
    "x-client-type": "WebApp",
  },
});
