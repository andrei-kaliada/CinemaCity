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
import { ActorService } from './actor.service'
import { ActorDto } from './dto/actor.dto'

@Controller('actor')
export class ActorController {
  constructor(private readonly actorService: ActorService) {}

  @Get('/by-slug/:slug')
  async finBySlug(@Param('slug') slug: string) {
    return await this.actorService.findBySlug(slug)
  }

  @Get()
  async getAll(@Query('searchTerm') searchTerm: string) {
    return await this.actorService.findAllActors(searchTerm)
  }

  // @Get('/collections')
  // async getCollections() {
  //   return await this.actorService.getCollections()
  // }

  @Auth('admin')
  @Get('/:id')
  async getById(@Param('id') id: string) {
    return await this.actorService.findById(id)
  }

  @Auth('admin')
  @Post()
  async create() {
    return await this.actorService.create()
  }

  // @UsePipes(new ValidationPipe())
  @Auth('admin')
  @Put(':id')
  async update(@Param('id') id: string, @Body() actorDto: ActorDto) {
    return await this.actorService.update(id, actorDto)
  }

  @Auth('admin')
  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return await this.actorService.delete(id)
  }
}
