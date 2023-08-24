import {ShyftSdk} from "@shyft-to/js";
import {network} from "../Constants.ts";

export const shyft = new ShyftSdk({apiKey: import.meta.env.VITE_SHYFT_API_KEY, network: network.shyftNetwork});