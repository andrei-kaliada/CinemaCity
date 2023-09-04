import NavMenuContainer from '@/components/layout/Navigation/MenuContainer/NavMenuContainer/NavMenuContainer'
import { FC } from 'react'
import { menuRouting } from './MenuContainer.data'
import styles from './MenuContainer.module.scss'

const MenuContainer:FC = () => {
	return (
		<div className={styles.menuContainer}>
			{
				menuRouting.map(route => (
					<NavMenuContainer key={route.id} menu={route} />
				))
			}
			{/* {Genres menu} */}
		</div>
	)
}

export default MenuContainer
