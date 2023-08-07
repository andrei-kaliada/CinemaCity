import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService, JwtSignOptions } from '@nestjs/jwt'
import { ModelType } from '@typegoose/typegoose/lib/types'
import * as bcrypt from 'bcrypt'
import { InjectModel } from 'nestjs-typegoose'
import { UserModel } from 'src/user/entity/user.model'
import { UserService } from 'src/user/user.service'
import { AuthDto } from './dto/auth.dto'
import { RefreshTokenDto } from './dto/refreshToken.dto'

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UserModel) private readonly userModel: ModelType<UserModel>,
    private readonly jwtService: JwtService,
    private readonly userService: UserService
  ) {}

  async register(dto: AuthDto) {
    const findUser = await this.userModel.findOne({ email: dto.email })
    if (findUser) {
      throw new ForbiddenException('User with this email already exist')
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10)

    const newUser = await this.userModel.create({
      ...dto,
      password: hashedPassword,
    })
    const tokens = await this.createTokens(String(newUser._id))

    return {
      user: await this.userService.returnUserFields(newUser),
      ...tokens,
    }
  }

  async login(dto: AuthDto) {
    const findUser = await this.userModel.findOne({ email: dto.email })
    let isValidPassword: boolean = false

    if (findUser) {
      isValidPassword = await bcrypt.compare(dto.password, findUser.password)
    }

    if (!isValidPassword && !findUser) {
      throw new ForbiddenException('Invalid email or password')
    }

    const user = await this.userService.returnUserFields(findUser)

    const tokens = await this.createTokens(String((await user)._id))

    return {
      user,
      ...tokens,
    }
  }

  async getNewTokens({ refreshToken }: RefreshTokenDto) {
    if (!refreshToken) throw new UnauthorizedException('Please sign in')

    const result = await this.jwtService.verifyAsync(refreshToken)

    if (!result) throw new UnauthorizedException('Invalid token or expired')

    const findUser = await this.userModel.findById(result._id)

    const user = await this.userService.returnUserFields(findUser)

    const newTokens = await this.createTokens(String(user._id))

    return {
      user,
      ...newTokens,
    }
  }

  async createTokens(userId: string) {
    const payload = { _id: userId }

    const accessTokenOptions: JwtSignOptions = { expiresIn: '1h' }
    const accessToken = await this.jwtService.signAsync(
      payload,
      accessTokenOptions
    )

    const refreshTokenOptions: JwtSignOptions = { expiresIn: '15h' }
    const refreshToken = await this.jwtService.signAsync(
      payload,
      refreshTokenOptions
    )

    return {
      accessToken,
      refreshToken,
    }
  }
}
