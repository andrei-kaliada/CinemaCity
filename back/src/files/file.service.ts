import { Injectable } from '@nestjs/common'
import { path } from 'app-root-path'
import { ensureDir, writeFile } from 'fs-extra'
import { FileResponse } from './file.interface'


@Injectable()
export class FileService {
	constructor(){}

	async saveFile(files: Express.Multer.File[], folder: string = 'default'): Promise<FileResponse[]>{
		console.log(files)
		console.log(folder)
		const uploadFolderPath = `${path}/uploads/${folder}`
		console.log(uploadFolderPath)
		console.log('path:', path)
		await ensureDir(uploadFolderPath)

		const response = Promise.all(
			files.map(async file =>{
				await writeFile(`${uploadFolderPath}/${file.originalname}`, file.buffer)
				return {
					url: `${uploadFolderPath}/${file.originalname}`,
					name: file.originalname
				}
			})
		)

		return response
	}
}