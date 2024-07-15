import TelegramBot from "node-telegram-bot-api";
import { START_MENU } from "../../config/bot/menus";
import { CreateWallet } from "../../lib/create-wallet";
import { PrismaUserRepository } from "../../repositories/prisma/user";

export class StartCommand {
    private prismaUserRepository: PrismaUserRepository
    constructor(
        private bot: TelegramBot
    ) {
        this.bot = bot
        this.prismaUserRepository = new PrismaUserRepository()
    }

    public start() {
        this.bot.onText(/\/start/, async (msg) => {
            const chatId = msg.chat.id;
            const firstName = msg.from?.first_name || ''
            const lastName = msg.from?.last_name || ''
            const username = msg.from?.username || ''
            const userId = msg.chat.id.toString()

            if (!userId) {
              return
            }
        
            const commandMenu = {
              reply_markup: {
                inline_keyboard: START_MENU,
              },
            };
        
            this.bot.sendMessage(chatId, `Hello, ${firstName}! Welcome to our bot. How can I help you today?`, commandMenu);

             // Find existing user
            const user = await this.prismaUserRepository.getById(userId)

            // // Create new user
            if (!user) {
              await this.prismaUserRepository.create({ firstName, id: userId, lastName, username })
            }
          });
    }
}