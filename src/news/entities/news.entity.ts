import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, OneToMany, RelationId } from 'typeorm';
import { IsString, Length } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { User } from 'src/users/entities/user.entity';

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

  // @Field(() => Category, { nullable: true })
  // @ManyToOne(() => Category, (category) => category.restaurants, {
  //   nullable: true,
  //   onDelete: 'SET NULL',
  // })
  // category: Category;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.news, {
    onDelete: 'CASCADE',
  })
  publisher: User;
}
