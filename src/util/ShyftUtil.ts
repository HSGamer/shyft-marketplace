import {ShyftSdk} from "@shyft-to/js";
import {shyftNetwork} from "../Constants.ts";

export const shyft = new ShyftSdk({apiKey: import.meta.env.VITE_SHYFT_API_KEY, network: shyftNetwork});