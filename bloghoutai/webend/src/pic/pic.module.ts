import { Module } from '@nestjs/common';
import { PicService } from './pic.service';
import { PicController } from './pic.controller';
import { MulterModule } from '@nestjs/platform-express'
import { diskStorage } from 'multer';
import {join,extname} from 'path'
@Module({
  imports : [MulterModule.register({
    storage : diskStorage({
      destination : join(__dirname,'../images') ,//存放图片的路径 ,
      filename : (_,file,callback) => {
        const fileName = `${new Date().getTime() + extname(file.originalname)}`
        return callback(null,fileName)
      }
    })
  })] ,
  controllers: [PicController],
  providers: [PicService]
})
export class PicModule { }
