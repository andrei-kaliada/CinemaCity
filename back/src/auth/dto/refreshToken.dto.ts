import { IsString } from 'class-validator'

export class RefreshTokenDto {
	@IsString({message: 'Token was not found or it is not a string'})
	refreshToken: string
}