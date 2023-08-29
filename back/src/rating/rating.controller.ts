import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common'
import { Types } from 'mongoose'
import { Auth } from 'src/auth/decorators/role.decorator'
import { IdValidationPipe } from 'src/pipes/id.validation.pipe'
import { User } from 'src/user/decorators/user.decorator'
import { SetRatingDto } from './dto/set-rating.dto'
import { RatingService } from './rating.service'

@Controller('rating')
export class RatingController {
	constructor(private readonly ratingService: RatingService){}

	@Get('/:movieId')
	@Auth()
	@UsePipes(new IdValidationPipe())
	async getMovieRating(@User('_id', IdValidationPipe) _id: Types.ObjectId ,@Param('movieId') movieId: Types.ObjectId){
		return await this.ratingService.getMovieValueByUser(_id, movieId) 
	}

	@Post('')
	@Auth()
	@UsePipes(new ValidationPipe())
	async setRating(@User('_id', IdValidationPipe) userId: Types.ObjectId, @Body() ratingDto: SetRatingDto){
		return await this.ratingService.setRating(userId, ratingDto)
	}

}
