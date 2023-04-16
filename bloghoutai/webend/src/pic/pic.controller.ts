import { Controller, Get, Post, Body, Patch, Param, Delete,UseInterceptors,UploadedFile } from '@nestjs/common';
import { PicService } from './pic.service';
import { CreatePicDto } from './dto/create-pic.dto';
import { UpdatePicDto } from './dto/update-pic.dto';
import {FileInterceptor} from '@nestjs/platform-express'
@Controller('pic')
export class PicController {
  constructor(private readonly picService: PicService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  getPic(@UploadedFile() file):object {
    //返回的是图片在服务器中的位置
    return this.picService.getPic(file)
  }

  // @Post()
  // create(@Body() createPicDto: CreatePicDto) {
  //   return this.picService.create(createPicDto);
  // }
  
  // @Get()
  // findAll() {
  //   return this.picService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.picService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePicDto: UpdatePicDto) {
  //   return this.picService.update(+id, updatePicDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.picService.remove(+id);
  // }
}
