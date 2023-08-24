import {WalletAdapterNetwork} from "@solana/wallet-adapter-base";
import {Network} from "@shyft-to/js";

export const network = {
    walletNetwork: WalletAdapterNetwork.Devnet,
    shyftNetwork: Network.Devnet
};

export const marketplaceAddress = import.meta.env.VITE_MARKETPLACE_ADDRESS;