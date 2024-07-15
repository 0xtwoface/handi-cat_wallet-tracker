import dotenv from "dotenv"
import { WatchTransaction } from "./lib/watch-transactions";
import { bot } from "./providers/telegram";
import { StartCommand } from "./bot/commands/start-command";
import { NewMembersHandler } from "./bot/handlers/new-members-handler";
import { AddCommand } from "./bot/commands/add-command";
import { CallbackQueryHandler } from "./bot/handlers/callback-query-handler";
import express, { Express } from "express"
import { PrismaWalletRepository } from "./repositories/prisma/wallet";

dotenv.config()

const WALLET_ADDRESSES = [
    '4eADUUa7sumjdV1uJCBCZxCyeDYTbMruVwKNzWAnYZU4',
    '48ry8Bci3B62UNcUVvU2wavwSv9vjKCWEu9bTNmj6JqN',
    'Eah4NJNMLUsJwQnTyELgm28uqy3Jtn3ft1YJ7r6WH55d',
]

const PORT = process.env.PORT || 3001

class Main {
    private prismaWalletRepository: PrismaWalletRepository
    constructor(private app: Express = express()) {
        this.app.use(express.json({ limit: '50mb' }))

        this.setupRoutes()

        this.prismaWalletRepository = new PrismaWalletRepository()
    }

    setupRoutes() {
        // Default endpoint
        this.app.get('/', async (req, res) => {
            try {
                res.status(200).send('Hello world');
            } catch (error) {
                console.error('Error processing update:', error);
                res.status(500).send('Error processing update');
            }
        });
        this.app.post(`*`, async (req, res) => {
            try {
                bot.processUpdate(req.body);
                
                res.status(200).send('Update received');
            } catch (error) {
                console.error('Error processing update:', error);
                res.status(500).send('Error processing update');
            }
        });
        
    }

    public async init(): Promise<void> {
        // const allWallets = await this.prismaWalletRepository.getAll()
        // const walletAddresses = allWallets && allWallets.map(wallet => wallet.address);

        // console.log('ALL_WALLETS', walletAddresses);

    //    const stream = await this.prismaWalletRepository.pulseWallet()

    //    for await (const event of stream) {
    //         console.log('New event:', event)
    //     }

        // Solana
        // const watch = new WatchTransaction(walletAddresses || [])

        // await watch.watchSocket()

        // Bot
        const newMembersHandler = new NewMembersHandler(bot)
        const callbackQueryHandler = new CallbackQueryHandler(bot)
        const startCommand = new StartCommand(bot)
        const addCommand = new AddCommand(bot)
 
        newMembersHandler.newMember()
        callbackQueryHandler.call()
        startCommand.start()
        addCommand.addCommandHandler()
 
        this.app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

        await this.setupWalletWatcher();
        await this.listenForDatabaseChanges();
    }

    private async setupWalletWatcher(): Promise<void> {
        const allWallets = await this.prismaWalletRepository.getAll();
        const walletAddresses = allWallets?.map(wallet => wallet.address) || [];

        let watch = new WatchTransaction(walletAddresses || [])

        console.log('ALL_WALLETS', walletAddresses);

        if (watch) {
            await watch.updateWallets(walletAddresses);
        } else {
            watch = new WatchTransaction(walletAddresses);
            await watch.watchSocket();
        }
    }

    private async listenForDatabaseChanges(): Promise<void> {
        const stream = await this.prismaWalletRepository.pulseWallet();

        for await (const event of stream) {
            console.log('New event:', event);

            if (event.action === 'create' || event.action === 'delete') {
                // Refetch wallets and update watcher on create/delete actions
                await this.setupWalletWatcher();
            }
        }
    }
}

const main = new Main()
main.init()



