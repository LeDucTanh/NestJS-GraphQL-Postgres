import { News } from './../entities/news.entity';
import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutPut } from 'src/common/dtos/output.dto';

@InputType()
export class CreateNewsInput extends PickType(News, ['title', 'content']) {
  @Field(() => String)
  catName: string;
}

@ObjectType()
export class CreateNewsOutput extends CoreOutPut {}
