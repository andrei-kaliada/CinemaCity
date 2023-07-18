import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
      getHello(): { text: string } {
    return { text: 'This is new project!!!!!' }
  }
}
