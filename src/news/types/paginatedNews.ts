import { Field, ObjectType } from '@nestjs/graphql';
import { News } from '../entities/news.entity';

@ObjectType()
export class PaginatedNews {
  @Field(() => [News])
  data!: News[];

  @Field(() => Number)
  total!: number;
}
