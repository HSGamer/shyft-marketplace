import {ListedNftDetail} from "@shyft-to/js";
import {useConnection, useWallet} from "@solana/wallet-adapter-react";
import {Button} from "@mantine/core";
import {shyft} from "../util/ShyftUtil.ts";
import {confirmEncodedTransaction} from "../util/WalletUtil.ts";

type BuyButtonProps = {
    nftDetail: ListedNftDetail
}

export function BuyButton({nftDetail}: BuyButtonProps) {
    const {connection} = useConnection();
    const {publicKey, signTransaction} = useWallet();
    if (!publicKey) {
        return <></>
    }

    const buyNft = async () => {
        const buyResult = await shyft.marketplace.listing.buy({
            buyerWallet: publicKey.toBase58(),
            marketplaceAddress: nftDetail.marketplace_address,
            nftAddress: nftDetail.nft_address,
            price: nftDetail.price,
            sellerWallet: nftDetail.seller_address
        });

        const encodedTransaction = buyResult.encoded_transaction;

        await confirmEncodedTransaction(encodedTransaction, connection, signTransaction!);
    };

    const isOwner = publicKey?.toBase58() == nftDetail.nft_address;

    return isOwner
        ? (
            <Button variant="light" color="green" mt="md" radius="md" fullWidth>
                Owned
            </Button>
        )
        : (
            <Button variant="light" color="blue" mt="md" radius="md" fullWidth onClick={buyNft}>
                Buy
            </Button>
        )
}