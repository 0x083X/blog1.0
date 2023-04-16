import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common'
import { Response, Request } from 'express'
@Catch(HttpException)
export class HttpFilter  implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const req = ctx.getRequest<Request>()
        const res = ctx.getResponse<Response>()
        const status = exception.getStatus()
        res.status(status).json({
            data: exception.message, //错误信息
            time: new Date().getTime(), //发送时间
            success: false, //是否成功
            path: req.url, //接口地址 
            status //请求状态码
        })
    }
}