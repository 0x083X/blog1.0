import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PicModule } from './pic/pic.module';
import { ArticleModule } from './article/article.module';
import { TypeOrmModule } from '@nestjs/typeorm'
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [PicModule, ArticleModule, TypeOrmModule.forRoot({ //配置数据库
    type: "mysql", //数据库类型
    username: "root", //账号
    password: "33033303", //密码
    host: "localhost", //host
    port: 3306, //
    database: "blog", //库名
    synchronize: true, //synchronize字段代表是否自动将实体类同步到数据库
    retryDelay: 500, //重试连接数据库间隔
    retryAttempts: 10,//重试连接数据库的次数
    autoLoadEntities: true, //如果为true,将自动加载实体 forFeature()方法注册的每个实体都将自动添加到配置对象的实体数组中
  }), CommentModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
