import { IMenu } from '@/components/layout/Navigation/MenuContainer/MenuContainer.data'
import Auth from '@/components/layout/Navigation/MenuContainer/auth/Auth'
import { FC } from 'react'
import styles from './NavMenuContainer.module.scss'
import NavMenuContainerItem from './NavMenuContainerItem/NavMenuContainerItem'


const NavMenuContainer: FC<{menu: IMenu}> = ({
	menu: {
		id,
		title,
		submenu
	},
}) => {
	return (
		<div className={styles.navMenuContainer}>
			<div className={styles.navMenuContainer__title}>{title}</div>
			<ul>
				{
					submenu.map(menu => (
						<NavMenuContainerItem menu={menu} />
					))
				}
				{
					id === 'general' && <Auth />
				}
			</ul>
		</div>
	)
}

export default NavMenuContainer
