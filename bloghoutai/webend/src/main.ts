import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {NestExpressApplication} from '@nestjs/platform-express'
import {join} from 'path'
import {Response} from './common/response'
import {HttpFilter } from './common/filter'
import * as cors from 'cors'
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, 'images'),{  //设置公共资源路径(图片)
    // prefix : "/kgx"
  })
  app.useGlobalFilters(new HttpFilter()) //使用错误拦截器
  app.use(cors()) //设置跨域
  app.useGlobalInterceptors(new Response()) //设置响应数据的格式
  await app.listen(3000);
}
bootstrap();
