import { Category } from 'src/category/entities/category.entity';
import { InputType, PickType } from '@nestjs/graphql';

@InputType()
export class CreateCategoryInput extends PickType(Category, ['name']) {}
