import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { TypeOrmModule } from '@nestjs/typeorm'
import { Article } from './entities/article.entity'
@Module({
  imports: [TypeOrmModule.forFeature([Article])], //导入实体类
  controllers: [ArticleController],
  providers: [ArticleService]
})
export class ArticleModule { }