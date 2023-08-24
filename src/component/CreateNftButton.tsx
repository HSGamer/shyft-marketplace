import {useDisclosure} from "@mantine/hooks";
import {Button, Container, FileInput, Modal, TextInput} from "@mantine/core";
import {IconPlus} from "@tabler/icons-react";
import {useForm} from "@mantine/form";
import {useConnection, useWallet} from "@solana/wallet-adapter-react";
import {shyft} from "../util/ShyftUtil.ts";
import {confirmEncodedTransaction} from "../util/WalletUtil.ts";
import {useState} from "react";

type CreateNftFormValues = {
    name: string,
    symbol: string,
    description: string,
    image: File | undefined
}

export function CreateNftButton() {
    const {connection} = useConnection();
    const {publicKey, signTransaction} = useWallet();

    const [opened, {open, close}] = useDisclosure(false);
    const [nftAddress, setNftAddress] = useState<string | undefined>(undefined);

    const form = useForm<CreateNftFormValues>({
        initialValues: {
            name: '',
            symbol: '',
            description: '',
            image: undefined
        },
        validate: {
            name: value => value.length == 0 ? "Please fill this" : null,
            symbol: value => value.length == 0 ? "Please fill this" : null,
            image: value => !value ? "Please fill this" : null
        }
    });

    if (!publicKey) {
        return <></>
    }

    const createNft = async () => {
        const nftResult = await shyft.nft.createV2({
            creatorWallet: publicKey.toBase58(),
            image: form.values.image!,
            name: form.values.name,
            symbol: form.values.symbol,
            description: form.values.description
        });

        await confirmEncodedTransaction(nftResult.encoded_transaction, connection, signTransaction!);

        form.reset();
        setNftAddress(nftResult.mint);
    };

    return (
        <>
            <Modal opened={opened} onClose={close} title="Create NFT">
                <form>
                    <TextInput
                        placeholder="Cool NFT"
                        label="Name"
                        withAsterisk
                        {...form.getInputProps("name")}
                    />
                    <TextInput
                        placeholder="CNF"
                        label="Symbol"
                        withAsterisk
                        {...form.getInputProps("symbol")}
                    />
                    <TextInput
                        placeholder="This is a cool NFT"
                        label="Description"
                        {...form.getInputProps("description")}
                    />
                    <FileInput
                        placeholder="Pick file"
                        label="Image"
                        accept="image/png,image/jpeg"
                        withAsterisk
                        {...form.getInputProps("image")}
                    />
                    <Button fullWidth onClick={createNft}>Submit</Button>
                </form>

                {
                    !nftAddress
                        ? <></>
                        : (
                            <Container sx={{ backgroundColor: "limegreen" }}>
                                NFT Address: {nftAddress}
                            </Container>
                        )
                }
            </Modal>

            <Button
                leftIcon={<IconPlus size="1rem"/>}
                onClick={open}
            >
                Create NFT
            </Button>
        </>
    )
}