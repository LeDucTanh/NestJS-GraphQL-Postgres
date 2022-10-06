import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, OneToMany, RelationId } from 'typeorm';
import { IsString, Length } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { User } from 'src/users/entities/user.entity';
import { Category } from 'src/category/entities/category.entity';

@InputType('NewsInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class News extends CoreEntity {
  @Field(() => String)
  @Column()
  @IsString()
  @Length(5, 10)
  title: string;

  @Field(() => String)
  @Column()
  @IsString()
  content: string;

  @Field(() => Category, { nullable: true })
  @ManyToOne(() => Category, (category) => category.listNews, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  category: Category;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.news, {
    // eager: true
    onDelete: 'CASCADE',
  })
  publisher: User;

  @RelationId((news: News) => news.publisher)
  publisherId: number;
}
