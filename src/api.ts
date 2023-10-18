import Axios from "axios";
import { token } from "./constants";

export const api = Axios.create({
  baseURL: "http://localhost:5033/api/v1", // -> Local
  headers: {
    Authorization: `Bearer ${token}`,
    "x-client-type": "WebApp",
  },
});

// baseURL: "http://localhost:5033/api/v1", // -> Local
// baseURL: "https://api.dev.pointr.co/api/v1", // -> Dev (Not working)
// baseURL: "https://api.qa.pointr.co/api/v1", // -> QA
// baseURL: "https://api.pointr.co/api/v1", // -> Prod
