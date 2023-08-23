import { Ref, prop } from '@typegoose/typegoose'
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import { ActorModel } from 'src/actor/entity/actor.model'
import { GenreModel } from 'src/genre/entity/genre.model'

export class Parameters {
  @prop()
  year: number

  @prop()
  duration: number

  @prop()
  country: string[]
}

export class MovieModel extends TimeStamps {
  @prop()
  poster: string

  @prop()
  bigPoster: string

  @prop()
  title: string

  @prop({ unique: true })
  slug: string

  @prop()
  videoUrl: string

  @prop()
  parameters?: Parameters

  @prop({ default: 4.0 })
  rating?: number

  @prop({ default: 0 })
  countOpened?: number

  @prop({ ref: () => GenreModel })
  genres: Ref<GenreModel>[]

  @prop({ ref: () => ActorModel })
  actors: Ref<ActorModel>[]

  @prop({ default: false })
  isSendTelegram: boolean
}
