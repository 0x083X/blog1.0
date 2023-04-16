import { Injectable } from '@nestjs/common';
import { CreatePicDto } from './dto/create-pic.dto';
import { UpdatePicDto } from './dto/update-pic.dto';
interface Pic {
  fieldname : string ,
  originalname :string ,
  encoding : string ,
  mimetype : string ,
  destination : string ,
  filename : string ,
  path : string ,
  size : BigInt
}
@Injectable()
export class PicService {
  getPic(file: Pic) {
    file.path = 'http://localhost:3000/' + file.filename //修改地址(修改成存在服务器上的地址)
    return file
  }

  // create(createPicDto: CreatePicDto) {
  //   return 'This action adds a new pic';
  // }

  // findAll() {
  //   return `This action returns all pic`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} pic`;
  // }

  // update(id: number, updatePicDto: UpdatePicDto) {
  //   return `This action updates a #${id} pic`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} pic`;
  // }
}
