import { ConfigService } from '@nestjs/config'
import { TypegooseModuleOptions } from './../../node_modules/nestjs-typegoose/dist/typegoose-options.interface.d'

export const getMongoDbConfig = async (
  configService: ConfigService
): Promise<TypegooseModuleOptions> => ({
  uri: configService.get('MONGO_URI'),
})
