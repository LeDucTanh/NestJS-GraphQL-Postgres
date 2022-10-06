import { Field, ObjectType } from '@nestjs/graphql';
import { News } from '../../news/entities/news.entity';

@ObjectType()
export class PaginatedNews {
  @Field(() => [News])
  data!: News[];

  @Field(() => Number)
  total!: number;
}
