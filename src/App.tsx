import {ConnectionProvider, WalletProvider} from '@solana/wallet-adapter-react';
import {WalletModalProvider} from '@solana/wallet-adapter-react-ui';
import {clusterApiUrl} from '@solana/web3.js';
import {useMemo} from 'react';

import {MantineProvider} from '@mantine/core';
import {network} from "./Constants.ts";
import {Content} from "./Content.tsx";
import {ContentHeader} from "./ContentHeader.tsx";

export default function App() {
    const endpoint = useMemo(() => clusterApiUrl(network.walletNetwork), []);
    const wallets = useMemo(() => [], []);

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>
                    <MantineProvider withGlobalStyles withNormalizeCSS>
                        <ContentHeader />
                        <Content />
                    </MantineProvider>
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
}
