import { ForbiddenException, Injectable } from '@nestjs/common'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { InjectModel } from 'nestjs-typegoose'
import { UserModel } from './entity/user.model'

@Injectable()
export class UserService {

	constructor(@InjectModel(UserModel) private readonly userModel: ModelType<UserModel>){}

	async getAllUsers() {
		const findUsers = await this.userModel.find();

		if(!findUsers) throw new ForbiddenException('Users was not found')
		const users = await Promise.all(findUsers.map(async user => await this.returnUserFields(user)))

		return users
	}

	async getProfile(_id: string) {
		const findUser = await this.userModel.findById(_id)

		if(!findUser) throw new ForbiddenException('User not found')

		return findUser;
	}

  async returnUserFields(user: UserModel) {
    return {
      _id: user._id,
      email: user.email,
      isAdmin: user.isAdmin
    }
  }
}
