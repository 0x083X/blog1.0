/**
 * 定义统一返回数据的格式
 */

import { Injectable, NestInterceptor, CallHandler, Inject } from '@nestjs/common'
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs'

interface data<T> {
    data: T
}

@Injectable()
export class Response<T = any> implements NestInterceptor {
    intercept(context, next: CallHandler): Observable<data<T>> {
        return next.handle().pipe(map(data => {
            return {
                data,
                status: 200,
                success: true,
                message: '成功调用到该接口'
            }
        }))
    }
}
