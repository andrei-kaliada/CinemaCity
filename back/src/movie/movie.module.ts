import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypegooseModule } from 'nestjs-typegoose'
import { TelegramModule } from 'src/telegram/telegram.module'
import { MovieModel } from './entity/movie.model'
import { MovieController } from './movie.controller'
import { MovieService } from './movie.service'

@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: MovieModel,
        schemaOptions: {
          collection: 'Movie',
        },
      },
    ]),
    ConfigModule,
    TelegramModule
  ],
  controllers: [MovieController],
  providers: [MovieService],
  exports: [MovieService]
})
export class MovieModule {}
