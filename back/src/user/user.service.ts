import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { genSalt, hash } from 'bcrypt'
import { Types } from 'mongoose'
import { InjectModel } from 'nestjs-typegoose'
import { UpdateUserDto } from './dto/update-user.dto'
import { UserModel } from './entity/user.model'

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel) private readonly userModel: ModelType<UserModel>
  ) {}

  async getAllUsers(searchTerm: string) {
    let options = {}

    if (searchTerm) {
      options = {
        $or: [
          {
            email: new RegExp(searchTerm, 'i'),
          },
        ],
      }
    }

    return await this.userModel
      .find(options)
      .select('-password -updatedAt -__v')
      .sort({
        createdAt: 'desc',
      })
      .exec()
  }

  async findUserById(_id: string) {
    const findUser = await this.userModel
      .findById(_id)
      .select('-password -updatedAt -__v')
      .exec()
    if (!findUser) throw new ForbiddenException('User not found')

    return findUser
  }

  async getProfile(_id: string) {
    const findUserProfile = await this.findUserById(_id)

    return findUserProfile
  }

  async updateUser(_id: string, userDto: UpdateUserDto) {
    const user = await this.findUserById(_id)
    const isSameUser = await this.userModel.findOne({ email: userDto.email })

    if (isSameUser && String(_id) !== String(isSameUser._id))
      throw new NotFoundException('Email already busy')

    user.email = userDto.email

    if (userDto.password) {
      const salt = await genSalt(10)
      user.password = await hash(userDto.password, salt)
    }

    if (userDto.isAdmin || userDto.isAdmin === false)
      user.isAdmin = userDto.isAdmin

    await user.save()

    return user
  }

  async getCount() {
    return this.userModel.find().count().exec()
  }

  async deleteUser(_id: string) {
    return this.userModel.findByIdAndDelete({ _id }).exec()
  }

  async returnUserFields(user: UserModel) {
    return {
      _id: user._id,
      email: user.email,
      isAdmin: user.isAdmin,
    }
  }

  async toggleFavoriteMovie(userId: string, movieId: Types.ObjectId) {
    try {
      const user = await this.findUserById(userId)

      if (!user) throw new ForbiddenException('User was not found')

      if (user.favorites.includes(movieId)) {
        const favorite = user.favorites.filter(
          (item) => item.toString() !== movieId.toString()
        )
        user.favorites = favorite
      } else {
        user.favorites.push(movieId)
      }

      await user.save()

      return user
    } catch (error) {
      throw new ForbiddenException(error.message)
    }
  }

  async getFavoriteMovies(_id: Types.ObjectId) {
    try {
      const user = await this.userModel
      .findById(_id, 'favorites')
      .populate({
        path: 'favorites',
        populate: {
          path: 'genres'
        }
      })
      .exec();

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user.favorites;
    } catch (error) {
      throw new ForbiddenException(error.message)
    }
  }
}
