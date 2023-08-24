import {Center, Loader, SimpleGrid} from "@mantine/core";
import {useEffect, useState} from "react";
import {shyft} from "../util/ShyftUtil.ts";
import {marketplaceAddress} from "../Constants.ts";
import {ListedNftDetail} from "@shyft-to/js";
import {ListNftItem} from "./ListNftItem.tsx";

export function ListNft() {
    const [nfts, setNfts] = useState<ListedNftDetail[] | undefined>(undefined)

    useEffect(() => {
        async function fetchListNft() {
            const activeListing = await shyft.marketplace.listing.active({
                marketplaceAddress: marketplaceAddress!
            })

            setNfts(activeListing.data)
        }

        fetchListNft().catch(console.error)
    }, []);

    if (!nfts) {
        return (
            <Center>
                <Loader />
            </Center>
        )
    }

    const nftElements = nfts.map(nftDetail => <ListNftItem nftDetail={nftDetail} />)

    return (
        <SimpleGrid cols={4} spacing="xl">
            {nftElements}
        </SimpleGrid>
    );
}