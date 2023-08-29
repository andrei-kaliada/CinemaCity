import { ForbiddenException, Injectable } from '@nestjs/common'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { Types } from 'mongoose'
import { InjectModel } from 'nestjs-typegoose'
import { MovieService } from 'src/movie/movie.service'
import { SetRatingDto } from './dto/set-rating.dto'
import { RatingModel } from './entity/rating.model'
import { RatingModule } from './rating.module'

@Injectable()
export class RatingService {
	constructor(@InjectModel(RatingModel) private readonly ratingModel: ModelType<RatingModel>,
	private readonly movieService: MovieService 
	){}

	async getMovieValueByUser(userId: Types.ObjectId, movieId: Types.ObjectId){
		try {
			const value = await this.ratingModel.findOne({movieId, userId}).select('value').exec().then(data => data ? data.value : 0)

			if(!value) throw new ForbiddenException('Rating for this movie was not found')

			return value
		} catch (error) {
			throw new ForbiddenException(error.message)
		}
	}

	async calculateAverageRating(movieId: Types.ObjectId | string) {
		try {
			const rating: RatingModule[] = await this.ratingModel.aggregate().match({
				movieId: new Types.ObjectId(movieId)
			}).exec()

			const value = rating.reduce((accumulator: number, currentValue: RatingModel) => {
				return  accumulator + currentValue.value
			}, 0)

			return Number(value) / rating.length
		} catch (error) {
			throw new ForbiddenException(error.message)
		}
	}

	async setRating(userId: Types.ObjectId, ratingDto: SetRatingDto){
		try {
			const { movieId, value } = ratingDto
			
			const rating = await this.ratingModel.findOneAndUpdate({userId, movieId}, {
				userId, movieId, value
			}, {
				new: true,
				upsert: true,
				setDefaultsOnInsert: true
			}).exec()

			if(!rating) throw new ForbiddenException('Rating for this movie was not found')

			const averageRating = await this.calculateAverageRating(movieId)

			const updatedRating = await this.movieService.updateAverageRating(averageRating, movieId)
			return updatedRating
		} catch (error) {
			throw new ForbiddenException(error.message)
		}
	}
}
