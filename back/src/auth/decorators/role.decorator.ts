import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common'
import { TypeRole } from '../auth.interface'
import { AdminGuard } from '../guards/admin.guard'
import { JwtAuthGuard } from '../guards/jwt-auth.guard'

export const Auth = (role: TypeRole = 'user') => {
	return applyDecorators(
		SetMetadata('role', role),
		role === 'admin' ? UseGuards(JwtAuthGuard, AdminGuard) : UseGuards(JwtAuthGuard),
	)
}