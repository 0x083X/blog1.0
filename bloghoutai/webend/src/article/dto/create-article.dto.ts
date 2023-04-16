import { IsNotEmpty, IsString, IsNumber } from 'class-validator'
type value = {
    title: string,
    content: string,
    bgcImg: string,
    article_id: string,
    create_time: Date,
    update_time: Date,
    sort: string,
    sort_id: number,
    status: number
}
export class CreateArticleDto {
    //TODO: 完善传入的参数 ？ 设置一个pipe？
    @IsNotEmpty()
    _value: value //一个对象，里面有title，content以及文章图片
}
