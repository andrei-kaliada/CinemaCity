import { Injectable } from '@nestjs/common'
import { getTelegramConfig } from 'src/config/telegram.config'
import { Telegraf } from 'telegraf'
import { ExtraReplyMessage } from './../../../node_modules/telegraf/src/telegram-types'
import { ITelegram } from './telegram.interface'

@Injectable()
export class TelegramService {
	bot: Telegraf
	options: ITelegram
	
	constructor(){
		this.options = getTelegramConfig()
		this.bot = new Telegraf(this.options.token)
	}

	async sendMessage(message: string, options?: ExtraReplyMessage, chatId = this.options.chatId){
		await this.bot.telegram.sendMessage(chatId, message, {
			parse_mode: 'HTML',
			...options
		})
	}

	async sendPhoto(photo: string, msg?: string, chatId = this.options.chatId){
		await this.bot.telegram.sendPhoto(chatId, photo , msg ? {caption: msg} : {})
	}

}
