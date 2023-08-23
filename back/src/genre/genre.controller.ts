import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common'
import { Auth } from 'src/auth/decorators/role.decorator'
import { UpdateGenreDto } from './dto/update-genre.dto'
import { GenreService } from './genre.service'

@Controller('genre')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @Get('/by-slug/:slug')
  async finBySlug(@Param('slug') slug: string) {
    return await this.genreService.findBySlug(slug)
  }

  @Get()
  async getAll(@Query('searchTerm') searchTerm: string) {
    return await this.genreService.getAllGenre(searchTerm)
  }

  @Get('/collections')
  async getCollections() {
    return await this.genreService.getCollections()
  }

  @Auth('admin')
  @Get('/:id')
  async getById(@Param('id') id: string) {
    return await this.genreService.finById(id)
  }

  @Auth('admin')
  @Post()
  async create() {
    return await this.genreService.createGenre()
  }

  // @UsePipes(new ValidationPipe())
  @Auth('admin')
  @Put(':id')
  async update(@Param('id') id: string, @Body() genreDto: UpdateGenreDto) {
    return await this.genreService.updateGenre(id, genreDto)
  }

  @Auth('admin')
  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return await this.genreService.deleteGenre(id)
  }
}
