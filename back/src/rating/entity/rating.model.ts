import { Ref, prop } from '@typegoose/typegoose'
import { MovieModel } from 'src/movie/entity/movie.model'
import { UserModel } from 'src/user/entity/user.model'


export class RatingModel {
	@prop({ref: () => UserModel})
	userId: Ref<UserModel>

	@prop({ref: () => MovieModel})
	movieId: Ref<MovieModel>

	@prop({type: Number})
	value: number
}