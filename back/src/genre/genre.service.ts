import { ForbiddenException, Injectable } from '@nestjs/common'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { InjectModel } from 'nestjs-typegoose'
import { CreateGenreDto } from './dto/create-genre.dto'
import { UpdateGenreDto } from './dto/update-genre.dto'
import { GenreModel } from './entity/genre.model'

@Injectable()
export class GenreService {
  constructor(
    @InjectModel(GenreModel) private readonly genreModel: ModelType<GenreModel>
  ) {}

  async getAllGenre(searchTerm?: string) {
    try {
      let options = {}

      if (searchTerm) {
        options = {
          $or: [
            { name: { $regex: searchTerm, $options: 'i' } },
            { slug: { $regex: searchTerm, $options: 'i' } },
            { description: { $regex: searchTerm, $options: 'i' } },
          ],
        }
      }

      const data = await this.genreModel
        .find(options)
        .select('-updatedAt -__v')
        .sort({ createdAt: 'desc' })
        .exec()

      if (!data) throw new ForbiddenException('Genre was not found')

      return data
    } catch (error) {
      throw new ForbiddenException(error)
    }
  }

  async getCollections() {
    const genres = await this.getAllGenre()
    const collections = genres

    return collections
  }

  async createGenre() {
    const defaultTemplate: CreateGenreDto = {
      name: '',
      slug: '',
      description: '',
      icon: '',
    }

    const data = await this.genreModel.create(defaultTemplate)

    return data._id
  }

  async findBySlug(slug: string) {
    try {
      const data = await this.genreModel.findOne({ slug }).exec()
      if (!data) throw new ForbiddenException('Slug was not found')
      return data
    } catch (error) {
      throw new ForbiddenException(error)
    }
  }

  async finById(id: string) {
    try {
      const data = await this.genreModel.findById(id)
      if (!data)
        throw new ForbiddenException('Genre with this id was not found')

      return data
    } catch (error) {
      throw new ForbiddenException(error)
    }
  }

  async updateGenre(id: string, updateDto: UpdateGenreDto) {
    try {
      const genre = await this.genreModel
        .findByIdAndUpdate({ _id: id }, { ...updateDto }, { new: true })
        .select('-updatedAt -__v')

      if (!genre) throw new ForbiddenException(`genre not found`)

      return genre
    } catch (error) {
      throw new ForbiddenException(error)
    }
  }

  async deleteGenre(genreId: string) {
    try {
      const data = await this.genreModel.findByIdAndDelete({ _id: genreId })
      if (!data)
        throw new ForbiddenException('Genre with this id was not found')
      return data
    } catch (error) {
      throw new ForbiddenException(error)
    }
  }
}
