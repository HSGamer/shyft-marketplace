import {WalletAdapterNetwork} from "@solana/wallet-adapter-base";
import {Network} from "@shyft-to/js";

export const network = "Devnet";

export const walletNetwork = WalletAdapterNetwork[network];
export const shyftNetwork = Network[network];

export const marketplaceAddress = import.meta.env.VITE_MARKETPLACE_ADDRESS;