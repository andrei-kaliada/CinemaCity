import { TypeMeterialIconName } from '@/shared/types/icon.types'
import { FC } from "react"
import * as Icons from 'react-icons/md'


const MaterialIcon: FC<{icon: TypeMeterialIconName}> = ({icon}) => {

	const IconComponent = Icons[icon]

	return <IconComponent />;
};

export default MaterialIcon;
