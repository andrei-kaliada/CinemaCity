import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypegooseModule } from 'nestjs-typegoose'
import { MovieModule } from 'src/movie/movie.module'
import { RatingModel } from './entity/rating.model'
import { RatingController } from './rating.controller'
import { RatingService } from './rating.service'

@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: RatingModel,
        schemaOptions: {
          collection: 'Rating',
        },
      },
    ]),
    ConfigModule,
    MovieModule
  ],
  providers: [RatingService],
  controllers: [RatingController]
})
export class RatingModule {}
