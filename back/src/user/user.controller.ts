import { Controller, Get } from '@nestjs/common'
import { Auth } from 'src/auth/decorators/role.decorator'
import { User } from './decorators/user.decorator'
import { UserService } from './user.service'

@Controller('user')
export class UserController {

	constructor(private readonly userService: UserService){}

	@Auth('admin')
	@Get()
	async getAllUsers(){
		return await this.userService.getAllUsers()
	}

	@Auth()
	@Get('/profile')
	async getProfile(@User('_id') _id: string){
		return this.userService.getProfile(_id)
	}
}
