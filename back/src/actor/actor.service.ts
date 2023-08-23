import { ForbiddenException, Injectable } from '@nestjs/common'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { InjectModel } from 'nestjs-typegoose'
import { ActorDto } from './dto/actor.dto'
import { ActorModel } from './entity/actor.model'

@Injectable()
export class ActorService {
  constructor(
    @InjectModel(ActorModel) private readonly actorModel: ModelType<ActorModel>
  ) {}

  async findBySlug(slug: string) {
    try {
      const response = this.actorModel.find({ slug }).exec()

      if (!response) throw new ForbiddenException('Slug was not found')

      return response
    } catch (error) {
      throw new ForbiddenException(error.message)
    }
  }

  async findAllActors(searchTerm?: string) {
    try {
      let options = {}

      if (searchTerm) {
        options = {
          $or: [
            { name: { $regex: searchTerm, $options: 'i' } },
            { slug: { $regex: searchTerm, $options: 'i' } },
          ],
        }
      }

      const actors = await this.actorModel
        .aggregate()
        .match(options)
        .lookup({
          from: 'Movie',
          localField: '_id',
          foreignField: 'actors',
          as: 'movies',
        })
        .addFields({
          countMovies: {
            $size: '$movies',
          },
        })
        .project({
          __v: 0,
          updatedAt: 0,
          movies: 0,
        })
        .sort({ createdAt: -1 })
        .exec()

      if (!actors) {
        throw new ForbiddenException(`No actors found`)
      }

      return actors
    } catch (error) {
      throw new ForbiddenException(error.message)
    }
  }

  async create() {
    try {
      const actor: ActorDto = {
        name: '',
        slug: '',
        photo: '',
      }
      const response = await this.actorModel.create(actor)

      if (!response)
        throw new ForbiddenException('Actor was not successfully created')

      return response
    } catch (error) {
      throw new ForbiddenException(error.message)
    }
  }

  async findById(id: string) {
    try {
      const actor = await this.actorModel.findById(id)

      if (!actor) throw new ForbiddenException('Actor was not found')

      return actor
    } catch (error) {
      throw new ForbiddenException(error.message)
    }
  }

  async update(id: string, actorDto: ActorDto) {
    try {
      const actor = await this.actorModel.findByIdAndUpdate(
        { _id: id },
        actorDto,
        {
          new: true,
        }
      )

      if (!actor) throw new ForbiddenException('Actor was not found')

      return actor
    } catch (error) {
      throw new ForbiddenException(error.message)
    }
  }

  async delete(id: string) {
    try {
      const response = await this.actorModel.findByIdAndDelete({ _id: id })

      if (!response) throw new ForbiddenException('Actor was not found')

      return response
    } catch (error) {
      throw new ForbiddenException(error.message)
    }
  }
}
