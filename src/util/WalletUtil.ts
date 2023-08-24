import {Connection, Transaction} from "@solana/web3.js";
import {SignerWalletAdapterProps} from "@solana/wallet-adapter-base";

export async function confirmTransaction(transaction: Transaction, connection: Connection, signTransaction: SignerWalletAdapterProps['signTransaction']) {
    const signedTx = await signTransaction(transaction);
    return await connection.sendRawTransaction(
        signedTx.serialize()
    );
}

export async function confirmEncodedTransaction(encodedTransaction: string, connection: Connection, signTransaction: SignerWalletAdapterProps['signTransaction']) {
    await confirmTransaction(Transaction.from(Buffer.from(encodedTransaction, 'base64')), connection, signTransaction);
}