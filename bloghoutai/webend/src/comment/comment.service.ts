import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Comment } from './entities/comment.entity'
type CommentData = {
  comment_id: number,
  pic: string | null,
  content: string | null,
  ip_address: string | null,
  browser: string | null,
  OS: string | null,
  create_time: Date | null,
  address : string | null,
}
@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment) private readonly comment: Repository<Comment>
  ) { }
  async create(createCommentDto: CreateCommentDto) {
    const data = new Comment()
    data.comment_id = 0
    data.OS = createCommentDto.OS
    data.browser = createCommentDto.browser
    // data.ip_address = createCommentDto.ip
    data.content = createCommentDto.textarea
    // data.address = createCommentDto.address
    data.create_time = new Date()
    this.comment.save(data)
    return "成功创建comment"
  }

  async findAll() {
    const data: CommentData[] = await this.comment.find() // => 找出所有的comment
    return data
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} comment`;
  // }

  // update(id: number, updateCommentDto: UpdateCommentDto) {
  //   return `This action updates a #${id} comment`;
  // }

  async remove(id: number) {
    const msg = await this.comment.delete(id)
    if (msg.affected) {
      return "删除成功"
    }
    else throw new HttpException("输入了错误的comment_id", HttpStatus.BAD_REQUEST) //抛出全局异常拦截器认识的Error才能经过全局异常拦截器
  }
}
