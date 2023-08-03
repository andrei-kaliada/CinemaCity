import { ForbiddenException, Injectable } from '@nestjs/common'
import { ModelType } from '@typegoose/typegoose/lib/types'
import * as bcrypt from 'bcrypt'
import { InjectModel } from 'nestjs-typegoose'
import { UserModel } from 'src/user/user.model'
import { AuthDto } from './dto/auth.dto'

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UserModel) private readonly userModel: ModelType<UserModel>
  ) {}

  async register(dto: AuthDto) {
    const user = await this.userModel.findOne({email: dto.email});
    console.log(user);
    if(user) {
      throw new ForbiddenException('User with this email already exist')
    }

    const hash = await bcrypt.hash(dto.password, 10)

    return (await this.userModel.create({...dto, password: hash})).save()
  }

  async login(dto: AuthDto): Promise<UserModel> {
    const user = await this.userModel.findOne({email: dto.email})
    let isValidPassword: boolean = false;

    if(user){
      isValidPassword = await bcrypt.compare(dto.password, user.password)
    }

    if(!isValidPassword && !user) {
      throw new ForbiddenException('Invalid email or password')
    }

    return user;
  }
}
