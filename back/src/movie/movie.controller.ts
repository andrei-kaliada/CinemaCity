import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { Types } from 'mongoose'
import { Auth } from 'src/auth/decorators/role.decorator'
import { IdValidationPipe } from 'src/pipes/id.validation.pipe'
import { CreateMovieDto } from './dto/create-movie.dto'
import { GenreIdsDto } from './dto/genreIds.dto'
import { MovieService } from './movie.service'

@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get('/by-slug/:slug')
  async finBySlug(@Param('slug') slug: string) {
    return await this.movieService.findBySlug(slug)
  }

  @Get('/by-actors/:actorId')
  async finByActor(
    @Param('actorId', IdValidationPipe) actorId: Types.ObjectId
  ) {
    return await this.movieService.findByActorId(actorId)
  }

  @UsePipes(new ValidationPipe())
  @Post('/by-genres')
  async finByGenreIds(
    @Body('genreIds', IdValidationPipe) { genreIds }: GenreIdsDto
  ) {
    return await this.movieService.findByGenreIds(genreIds)
  }

  @Get()
  async getAll(@Query('searchTerm') searchTerm: string) {
    return await this.movieService.getAll(searchTerm)
  }

  @Get('/most-popular')
  async getMostPopular() {
    return await this.movieService.getMostPopular()
  }

  @Put('/update-count-popular')
  async updateMostPopular(@Body('slug') slug: string) {
    return await this.movieService.updateCountOpened(slug)
  }

  @Auth('admin')
  @Get('/:id')
  async getById(@Param('id') id: string) {
    return await this.movieService.finById(id)
  }

  @Auth('admin')
  @Post()
  async create() {
    return await this.movieService.create()
  }

  @UsePipes(new ValidationPipe())
  @Auth('admin')
  @Put(':id')
  async update(@Param('id') id: string, @Body() movieDto: CreateMovieDto) {
    return await this.movieService.update(id, movieDto)
  }

  @Auth('admin')
  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return await this.movieService.delete(id)
  }
}
