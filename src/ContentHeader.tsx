import {Container, Flex, Header, rem} from "@mantine/core";
import {MantineLogo} from "@mantine/ds";
import {WalletMultiButton} from "@solana/wallet-adapter-react-ui";

import "@solana/wallet-adapter-react-ui/styles.css"

export function ContentHeader() {
    return <Header height={rem(60)}>
        <Container fluid>
            <Flex justify="space-between" align="center">
                <MantineLogo size={28} />

                <WalletMultiButton />
            </Flex>
        </Container>
    </Header>
}