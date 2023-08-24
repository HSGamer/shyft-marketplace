import {useDisclosure} from "@mantine/hooks";
import {Button, Modal, NumberInput, TextInput} from "@mantine/core";
import {IconBook} from "@tabler/icons-react";
import {useForm} from "@mantine/form";
import {useConnection, useWallet} from "@solana/wallet-adapter-react";
import {shyft} from "../util/ShyftUtil.ts";
import {confirmEncodedTransaction} from "../util/WalletUtil.ts";
import {marketplaceAddress} from "../Constants.ts";

type ListNftFormValues = {
    nftAddress: string,
    price: number
}

export function ListNftButton() {
    const {connection} = useConnection();
    const {publicKey, signTransaction} = useWallet();

    const [opened, {open, close}] = useDisclosure(false);

    const form = useForm<ListNftFormValues>({
        initialValues: {
            nftAddress: '',
            price: 0
        },
        validate: {
            nftAddress: value => value.length == 0 ? "Please fill this" : null,
            price: value => value <= 0 ? "Should be a positive number" : null
        }
    });

    if (!publicKey) {
        return <></>
    }

    const listNft = async () => {
        const nftResult = await shyft.marketplace.listing.list({
            marketplaceAddress: marketplaceAddress,
            nftAddress: form.values.nftAddress,
            price: form.values.price,
            sellerWallet: publicKey.toBase58()
        });

        await confirmEncodedTransaction(nftResult.encoded_transaction, connection, signTransaction!);

        form.reset();
    };

    return (
        <>
            <Modal opened={opened} onClose={close} title="Create NFT">
                <form>
                    <TextInput
                        label="NFT Address"
                        withAsterisk
                        {...form.getInputProps("nftAddress")}
                    />
                    <NumberInput
                        label="Price"
                        withAsterisk
                        {...form.getInputProps("price")}
                    />
                    <Button fullWidth onClick={listNft}>Submit</Button>
                </form>
            </Modal>

            <Button
                leftIcon={<IconBook size="1rem"/>}
                onClick={open}
            >
                List NFT
            </Button>
        </>
    )
}