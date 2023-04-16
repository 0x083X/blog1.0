import { IsNotEmpty, IsString, IsNumber } from 'class-validator'
export class CreateCommentDto {
    @IsNotEmpty()
    browser :string 
    OS :string 
    textarea : string
    ip:string
    address:string
}
