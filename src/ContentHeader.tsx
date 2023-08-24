import {Container, Flex, Header, Image, rem, Text} from "@mantine/core";
import {WalletMultiButton} from "@solana/wallet-adapter-react-ui";

import "@solana/wallet-adapter-react-ui/styles.css"
import {CreateNftButton} from "./component/CreateNftButton.tsx";
import {ListNftButton} from "./component/ListNftButton.tsx";

export function ContentHeader() {
    return <Header height={rem(60)}>
        <Container fluid mt={10}>
            <Flex justify="space-between" align="center">
                <Flex align="center" gap="md">
                    <Image src="https://hsgamer.me/logo.svg" height={50} fit={"contain"} />
                    <Text fw={500}>Marketplace</Text>
                </Flex>

                <Flex align="center" gap="sm">
                    <CreateNftButton />
                    <ListNftButton />
                </Flex>

                <WalletMultiButton />
            </Flex>
        </Container>
    </Header>
}