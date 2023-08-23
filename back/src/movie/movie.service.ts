import { ForbiddenException, Injectable } from '@nestjs/common'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { Types } from 'mongoose'
import { InjectModel } from 'nestjs-typegoose'
import { CreateMovieDto } from './dto/create-movie.dto'
import { MovieModel } from './entity/movie.model'

@Injectable()
export class MovieService {
  constructor(
    @InjectModel(MovieModel) private readonly movieModel: ModelType<MovieModel>
  ) {}

  async getAll(searchTerm?: string) {
    try {
      let options = {}

      if (searchTerm) {
        options = {
          $or: [{ title: { $regex: searchTerm, $options: 'i' } }],
        }
      }

      const data = await this.movieModel
        .find(options)
        .select('-updatedAt -__v')
        .sort({ createdAt: 'desc' })
        .populate('genres actors')
        .exec()

      if (!data) throw new ForbiddenException('Movie was not found')

      return data
    } catch (error) {
      throw new ForbiddenException(error)
    }
  }

  async create() {
    try {
      const defaultTemplate: CreateMovieDto = {
        poster: '',
        bigPoster: '',
        actors: [],
        genres: [],
        title: '',
        slug: '',
        videoUrl: '',
      }

      const data = await this.movieModel.create(defaultTemplate)

      if (!data) throw new ForbiddenException('Movie was not created')

      return data._id
    } catch (error) {
      throw new ForbiddenException(error.message)
    }
  }

  async findBySlug(slug: string) {
    try {
      const data = await this.movieModel
        .findOne({ slug })
        .populate('genres actors')
        .exec()
      if (!data) throw new ForbiddenException('Slug was not found')
      return data
    } catch (error) {
      throw new ForbiddenException(error)
    }
  }

  async findByActorId(actorId: Types.ObjectId) {
    try {
      const data = await this.movieModel.find({ actors: actorId }).exec()
      console.log('DATA:', data)
      if (!data || !data.length)
        throw new ForbiddenException('Movies was not found')
      return data
    } catch (error) {
      throw new ForbiddenException(error)
    }
  }

  async findByGenreIds(genreIds: Types.ObjectId[]) {
    try {
      const data = await this.movieModel
        .find({ genres: { $in: genreIds } })
        .exec()
      if (!data) throw new ForbiddenException('Movies was not found')
      return data
    } catch (error) {
      throw new ForbiddenException(error.message)
    }
  }

  async updateCountOpened(slug: string) {
    try {
      const data = await this.movieModel
        .findOneAndUpdate({ slug }, { $inc: { countOpened: 1 } }, { new: true })
        .exec()
      if (!data) throw new ForbiddenException('Movies was not found')
      return data
    } catch (error) {
      throw new ForbiddenException(error.message)
    }
  }

  async getMostPopular() {
    try {
      const data = await this.movieModel
        .find({ countOpened: { $gt: 0 } })
        .sort({ countOpened: -1 })
        .populate('genres')
        .exec()

      if (!data || !data.length)
        throw new ForbiddenException('Most popular movies was not found')

      return data
    } catch (error) {
      throw new ForbiddenException(error.message)
    }
  }

  async finById(id: string) {
    try {
      const data = await this.movieModel.findById(id)
      if (!data)
        throw new ForbiddenException('Movie with this id was not found')

      return data
    } catch (error) {
      throw new ForbiddenException(error)
    }
  }

  async update(id: string, updateDto: CreateMovieDto) {
    try {
      const genre = await this.movieModel
        .findByIdAndUpdate({ _id: id }, { ...updateDto }, { new: true })
        .populate('genres actors')
        .select('-updatedAt -__v')

      if (!genre) throw new ForbiddenException(`Movie was not found`)

      return genre
    } catch (error) {
      throw new ForbiddenException(error)
    }
  }

  async delete(genreId: string) {
    try {
      const data = await this.movieModel.findByIdAndDelete({ _id: genreId })
      if (!data)
        throw new ForbiddenException('Movie with this id was not found')
      return data
    } catch (error) {
      throw new ForbiddenException(error)
    }
  }
}
