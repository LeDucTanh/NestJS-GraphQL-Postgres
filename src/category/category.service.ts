import { CoreOutPut } from 'src/common/dtos/output.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryInput } from './dto/create-category.input';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async listCategory(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  async getOrCreateCat({ name }: CreateCategoryInput): Promise<Category> {
    try {
      const existingCat = await this.categoryRepository.findOne({
        where: { name },
      });
      if (existingCat) {
        return existingCat;
      }

      const category = await this.categoryRepository.save(
        this.categoryRepository.create({ name }),
      );
      return category;
    } catch (e) {
      console.log(e);
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }
}
