import Axios from "axios";
import "dotenv";

export const api = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_WT_API_URL,
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_WT_API_TOKEN}`,
    "x-client-type": "WebApp",
  },
});
