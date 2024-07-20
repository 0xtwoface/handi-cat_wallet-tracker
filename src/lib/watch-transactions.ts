import { PublicKey } from "@solana/web3.js";
import { connection } from "../providers/solana";
import { ValidTransactions } from "./valid-transactions";
import { PUMP_FUND_PROGRAM_ID, RAYDIUM_PROGRAM_ID } from "../config/solana/program-ids";
import EventEmitter from "events";
import { TransactionParser } from "../parsers/transaction-parser";
import { SendTransactionMsgHandler } from "../bot/handlers/send-tx-msg-handler";
import { bot } from "../providers/telegram";
import { Wallet } from "@prisma/client";
import { WalletWithUsers } from "../types/swap-types";

const pumpFunProgramId = new PublicKey(PUMP_FUND_PROGRAM_ID)
const raydiumProgramId = new PublicKey(RAYDIUM_PROGRAM_ID)

export class WatchTransaction extends EventEmitter {
    // Rate limit
    private rateLimitInterval: number;
    private lastProcessedTime: number;

    private subscriptions: Map<string, number>;

    constructor(rateLimitInterval: number = 5000) {
        super()

        // Rate limit
        this.rateLimitInterval = rateLimitInterval;
        this.lastProcessedTime = 0;

        this.subscriptions = new Map();
    }

    public async watchSocket(wallets: WalletWithUsers[]): Promise<void> {
       try {
        for (const wallet of wallets) {
            const publicKey = new PublicKey(wallet.address);
            const walletAddress = publicKey.toBase58();

            // Check if a subscription already exists for this wallet address
             if (this.subscriptions.has(walletAddress)) {
                continue; // Skip re-subscribing
            }

            console.log(`Watching transactions for wallet: ${walletAddress}`);
    
            // start realtime log
            const subscriptionId = await connection.onLogs(
              publicKey, async (logs, ctx) => {
                // rate limit
                const currentTime = Date.now();
                if (currentTime - this.lastProcessedTime < this.rateLimitInterval) {
                    return; // Skip processing if within rate limit interval
                }
    
                this.lastProcessedTime = currentTime; // Update the last processed time
    
                const transactionSignature = logs.signature
    
                // get full transaction
                const transactionDetails = await connection.getParsedTransactions([transactionSignature], {
                    maxSupportedTransactionVersion: 0,
                });
               
                if (!transactionDetails) {
                    return
                }
    
                // find all programIds involved in the transaction
                const programIds = transactionDetails[0]?.transaction.message.accountKeys.map(key => key.pubkey).filter(pubkey => pubkey !== undefined)
    
                const validTransactions = new ValidTransactions(pumpFunProgramId, raydiumProgramId, programIds)
                const isValidTransaction = validTransactions.getTransaction()
    
                if (!isValidTransaction.valid) {
                    return
                }
       
                // parse transaction
                const transactionParser = new TransactionParser(transactionSignature)
                const parsed = await transactionParser.parseNative(transactionDetails, isValidTransaction.swap)
    
                if (!parsed) {
                    return
                }
                
                console.log(parsed)
               
                // use bot to send message of transaction
                const sendMessageHandler = new SendTransactionMsgHandler(bot)
                
                for (const user of wallet.userWallets) {
                    console.log('Users:', user)
                    await sendMessageHandler.send(parsed, user.userId)
                }
            },
            'confirmed'
          );
    
           // Store subscription ID
           this.subscriptions.set(wallet.address, subscriptionId);
           console.log(`Subscribed to logs with subscription ID: ${subscriptionId}`);
        }
       } catch (error) {
         console.error('Error in watchSocket:', error);
       }
    }

    public async stopWatching(): Promise<void> {
        for (const [wallet, subscriptionId] of this.subscriptions) {
            connection.removeOnLogsListener(subscriptionId);
            console.log(`Stopped watching transactions for wallet: ${wallet}`);
        }
        this.subscriptions.clear();
    }

    public async updateWallets(newWallets: WalletWithUsers[]): Promise<void> {
        await this.stopWatching();
        await this.watchSocket(newWallets);
    }
}