import { FC } from 'react'
import styles from './Layout.module.scss'
import Navigation from './Navigation/Navigation'
import Sidebar from './Sidebar/Sidebar'

interface IProps {
	children: React.ReactNode
}

const Layout: FC<IProps> = ({children}) => {
	return (
	<div className={styles.layout}>
		<Navigation />
		<main className={styles.center}>
			{children}
		</main>
		<Sidebar />
	</div>
	)
};

export default Layout;
