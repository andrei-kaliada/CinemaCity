import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypegooseModule } from 'nestjs-typegoose'
import { MovieModule } from 'src/movie/movie.module'
import { GenreModel } from './entity/genre.model'
import { GenreController } from './genre.controller'
import { GenreService } from './genre.service'

@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: GenreModel,
        schemaOptions: {
          collection: 'Genre',
        },
      },
    ]),
    ConfigModule,
    MovieModule
  ],
  providers: [GenreService],
  controllers: [GenreController],
})
export class GenreModule {}
