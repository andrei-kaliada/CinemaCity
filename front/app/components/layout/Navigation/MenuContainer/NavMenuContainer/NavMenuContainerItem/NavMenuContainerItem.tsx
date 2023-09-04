import MaterialIcon from '@/components/UI/MaterialIcon/MaterialIcon'
import { ISubmenu } from '@/components/layout/Navigation/MenuContainer/MenuContainer.data'
import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC } from 'react'
import styles from './NavMenuContainerItem.module.scss'

const NavMenuContainerItem: FC<{menu: ISubmenu}> = ({
	menu: {
		id,
		title,
		componentPath,
		icon
	},
}) => {

	const router = useRouter()
	
	return (
		<li className={clsx(styles.navMenuContainerItem, {[styles.activeMenu]: router.asPath === componentPath} )}>
			<MaterialIcon icon={icon} />
			<Link className={styles.navMenuContainerItem__link} href={componentPath}>
				{title}
			</Link>
		</li>
	)
}

export default NavMenuContainerItem
