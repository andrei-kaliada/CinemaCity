import { Body, Controller, Delete, Get, HttpCode, Param, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common'
import { Auth } from 'src/auth/decorators/role.decorator'
import { IdValidationPipe } from 'src/pipes/id.validation.pipe'
import { User } from './decorators/user.decorator'
import { UpdateUserDto } from './dto/update-user.dto'
import { UserService } from './user.service'

@Controller('user')
export class UserController {

	constructor(private readonly userService: UserService){}

	@Auth('admin')
	@HttpCode(200)
	@Get()
	async getAllUsers(@Query('searchTerm') searchTerm?: string){
		return await this.userService.getAllUsers(searchTerm)
	}

	@Auth('admin')
	@HttpCode(200)
	@Get('/count')
	async getUsersCount(){
		return await this.userService.getCount()
	}

	@Auth('admin')
	@HttpCode(200)
	@Get('/:id')
	async getUserProfile(@Param('id') id: string){
		return await this.userService.findUserById(id)
	}

	@Auth()
	@HttpCode(200)
	@Get('/profile')
	async getProfile(@User('_id') _id: string){
		return this.userService.getProfile(_id)
	}

	@Auth()
	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Put('/profile')
	async updateProfile(@User('_id') _id: string, @Body() userDto: UpdateUserDto){
		return this.userService.updateUser(_id, userDto)
	}

	@Auth()
	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Put('/profile/:id')
	async updateUser(@Param('id', IdValidationPipe) _id: string, @Body() userDto: UpdateUserDto){
		return this.userService.updateUser(_id, userDto)
	}

	@Auth('admin')
	@HttpCode(200)
	@Delete("/:id")
	async deleteUser(@Param('id') id: string){
		return this.userService.deleteUser(id)
	}
}
