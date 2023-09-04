import logoIcon from '@/assets/images/icons/cinema_logo.svg'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import styles from './Logo.module.scss'

const Logo: FC = () => {
	return (
		<Link href={'/'} className={styles.logo}>
			<Image className={styles.logo__icon} width={35} height={35}  src={logoIcon} alt='Online cinema' draggable="false" />
			<div className={styles.logo__title}>CinemaCity</div>
		</Link>
	)
}

export default Logo
