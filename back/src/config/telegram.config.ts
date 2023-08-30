import { ITelegram } from 'src/telegram/telegram.interface'

export const getTelegramConfig = (): ITelegram => ({
	chatId: process.env.TELEGRAM_CHAT_ID,
  token: process.env.TELEGRAM_TOKEN,
})
