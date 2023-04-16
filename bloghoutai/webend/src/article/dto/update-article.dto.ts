import { PartialType } from '@nestjs/mapped-types';
import { CreateArticleDto } from './create-article.dto';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class UpdateArticleDto extends PartialType(CreateArticleDto) {}
