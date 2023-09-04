import { TypeMeterialIconName } from '@/shared/types/icon.types'

export interface ISubmenu {
	id: string
	title: string
	componentPath: string,
	icon: TypeMeterialIconName
}

export interface IMenu {
	id: string
	title: string
	submenu: ISubmenu[]
}

export const menuRouting: IMenu[] = [
	{
		id: 'menu',
		title: 'Menu',
		submenu: [
			{
				id: 'home',
				title: 'Home',
				componentPath: '/',
				icon: 'MdHome'
			},
			{
				id: 'discovery',
				title: 'Discovery',
				componentPath: '/discovery',
				icon: 'MdExplore'
			},
			{
				id: 'fresh_movies',
				title: 'Fresh movies',
				componentPath: '/fresh_movies',
				icon: 'MdRefresh'
			},
			{
				id: 'trending_now',
				title: 'Trending now',
				componentPath: '/trending_now',
				icon: 'MdLocalFireDepartment'
			},
		]
	},
	{
		id: 'popular_genres',
		title: 'Popular genres',
		submenu: []
	},
	{
		id: 'general',
		title: 'General',
		submenu: []
	},
]

// {
// 	id: 'popular_genres',
// 	title: 'Popular Genres',
// 	submenu: [
// 		{
// 			id: 'comedy',
// 			title: 'Comedy',
// 			componentPath: '/comedy',
// 			icon: 'face_smile_icon.svg'
// 		},
// 		{
// 			id: 'cartoons',
// 			title: 'Cartoons',
// 			componentPath: '/cartoons',
// 			icon: 'family_icon.svg'
// 		},
// 		{
// 			id: 'fantasy',
// 			title: 'Fantasy',
// 			componentPath: '/fantasy',
// 			icon: 'magic_wand_icon.svg'
// 		},
// 		{
// 			id: 'biography',
// 			title: 'Biography',
// 			componentPath: '/biography',
// 			icon: 'face_icon.svg'
// 		},
// 	]
// },