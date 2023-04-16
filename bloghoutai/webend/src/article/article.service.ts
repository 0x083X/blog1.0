import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from './entities/article.entity';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, Like } from 'typeorm'
interface articleData {
  // article_id: number,
  content: string,
}
@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article) private readonly article: Repository<Article>//注入实体
  ) { }
  //TODO: 完善文章的参数
  async create(createArticleDto: CreateArticleDto) {
    const data = new Article() //创建一个实例
    data.article_id = 0
    data.title = createArticleDto._value.title
    data.content = createArticleDto._value.content
    data.bgcImg = createArticleDto._value.bgcImg
    data.create_time = new Date()
    data.update_time = new Date()
    data.sort = createArticleDto._value.sort
    // data.sort = createArticleDto._value.sort
    const message =await this.article.save(data) //message是文章的信息
    return '成功创建文章';
  }

  async findAll(query: { keyWord: string }) { //找出所有的文章
    const data = await this.article.find({
      where: {
        title: Like(`%${query.keyWord}%`)
      },
    })
    return { data };
  }

  async findOne(id: number) {
    const data = await this.article.find({
      where: {
        article_id: id
      }
    })
    return data[0];
  }

  async update(id: number, updateArticleDto: UpdateArticleDto) {
    const article = await this.findOne(id)
    article.bgcImg = updateArticleDto._value.bgcImg
    article.content = updateArticleDto._value.content
    article.title = updateArticleDto._value.title
    //不能用updateArticleDto赋值因为它的update_time是string类型的
    article.update_time = new Date()
    article.sort = updateArticleDto._value.sort
    this.article.save(article)
    return `成功修改`;
  }

  async remove(id: number) {
    const message = await this.article.delete(id)
    if (message.affected) { //如果删除了就返回true
      return "删除成功"
    }
    else throw new HttpException("发送的文章数据异常",HttpStatus.BAD_REQUEST) //抛出全局异常拦截器认识的Error才能经过全局异常拦截器
  }
}
