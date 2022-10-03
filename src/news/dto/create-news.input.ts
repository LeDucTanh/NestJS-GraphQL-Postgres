import { News } from './../entities/news.entity';
import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutPut } from 'src/common/dtos/output.dto';

@InputType()
export class CreateNewsInput extends PickType(News, ['title', 'content']) {}

@ObjectType()
export class CreateNewsOutput extends CoreOutPut {}
