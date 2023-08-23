import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypegooseModule } from 'nestjs-typegoose'
import { ActorController } from './actor.controller'
import { ActorService } from './actor.service'
import { ActorModel } from './entity/actor.model'

@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: ActorModel,
        schemaOptions: {
          collection: 'Actor',
        },
      },
    ]),
    ConfigModule,
  ],
  controllers: [ActorController],
  providers: [ActorService],
})
export class ActorModule {}
