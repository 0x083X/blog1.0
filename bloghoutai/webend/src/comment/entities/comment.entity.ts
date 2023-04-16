//comment的实体类
import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm'
@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    comment_id : number 
    @Column({
        type : 'varchar',
        name : 'pic' ,
        comment : 'base64格式的图片' ,
        default : 'null' ,
        nullable : true ,
    })
    pic : string 
    @Column({
        type : 'varchar',
        name : 'content' ,
        comment : '评论内容' ,
        nullable : true ,
    })
    content : string 
    @Column({
        type : 'varchar',
        name : 'ip_address' ,
        comment : 'ip地址' ,
        nullable : true ,
    })
    ip_address : string 
    @Column({
        type : 'varchar',
        name : 'browser' ,
        comment : '浏览器' ,
        nullable : true ,
    })
    browser : string 
    @Column({
        type : 'varchar',
        name : 'OS' ,
        comment : '操作系统' ,
        nullable : true ,
    })
    OS : string 
    @Column({
        type : 'date',
        name : 'create_time' ,
        comment : '发表评论的时间' ,
        nullable : true ,
    })
    create_time : Date 
    @Column({
        type : 'varchar',
        name : 'address' ,
        comment : '用户地址' ,
        nullable : true ,
    })
    address : string
}
