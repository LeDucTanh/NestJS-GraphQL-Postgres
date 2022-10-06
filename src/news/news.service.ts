import { Repository, Raw } from 'typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CoreOutPut } from 'src/common/dtos/output.dto';
import { User } from 'src/users/entities/user.entity';
import { CreateNewsInput } from './dto/create-news.input';
import { News } from './entities/news.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginatedNews } from '../common/dtos/paginatedNews.dto';
import { CategoryService } from 'src/category/category.service';
import { CreateCategoryInput } from 'src/category/dto/create-category.input';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News)
    private readonly newsRepository: Repository<News>,
    private readonly categoryService: CategoryService,
  ) {}

  async findAll(page: number, limit: number): Promise<PaginatedNews> {
    const [news, total] = await this.newsRepository.findAndCount({
      take: limit,
      skip: (page - 1) * limit,
    });

    return { data: news, total };
  }

  async findMyNews(
    currentUserId: number,
    page: number,
    limit: number,
  ): Promise<PaginatedNews> {
    const queryBuilder = this.newsRepository
      .createQueryBuilder('news')
      .leftJoinAndSelect('news.publisher', 'publisher');

    queryBuilder.andWhere('news.publisherId = :id', {
      id: currentUserId,
    });
    const count = await queryBuilder.getCount();

    queryBuilder.limit(limit);
    queryBuilder.offset((page - 1) * limit);

    const news = await queryBuilder.getMany();
    return { data: news, total: count };
  }

  async searchNews(
    keyWord: string,
    page: number,
    limit: number,
  ): Promise<PaginatedNews> {
    const [news, total] = await this.newsRepository.findAndCount({
      where: [
        {
          title: Raw((title) => `${title} ILIKE '%${keyWord}%'`),
        },
        {
          content: Raw((content) => `${content} ILIKE '%${keyWord}%'`),
        },
      ], // send sql query directly through Raw
      take: limit,
      skip: (page - 1) * limit,
    });

    return { data: news, total };
  }

  async getDetailNews(id: number): Promise<News> {
    const news = this.finById(id);
    if (!news) {
      throw new HttpException('News does not exist', HttpStatus.NOT_FOUND);
    }
    return news;
  }

  async createNews(
    owner: User,
    createNewsInput: CreateNewsInput,
  ): Promise<CoreOutPut> {
    try {
      const news = new News();
      // console.log(`news: ${JSON.stringify(news)}`);
      Object.assign(news, createNewsInput);
      const category = await this.categoryService.getOrCreateCat({
        name: createNewsInput.catName,
      });
      news.category = category;
      news.publisher = owner;
      await this.newsRepository.save(news); // save on DB
      return {
        ok: true,
      };
    } catch (e) {
      console.log(e);
      return {
        ok: false,
        error: 'Could not create news',
      };
    }
  }

  async updateNews(
    id: number,
    updateNewsInput: CreateNewsInput,
    currentUserId: number,
  ): Promise<News> {
    const article = await this.finById(id);

    if (!article) {
      throw new HttpException('News does not exist', HttpStatus.NOT_FOUND);
    }

    if (article.publisher.id !== currentUserId) {
      throw new HttpException('You are not an author', HttpStatus.FORBIDDEN);
    }

    Object.assign(article, updateNewsInput);

    return await this.newsRepository.save(article);
  }

  async deleteNews(id: number, currentUserId: number): Promise<CoreOutPut> {
    const article = await this.finById(id);

    if (!article) {
      return {
        ok: false,
        error: 'News does not exist',
      };
    }

    if (article.publisher.id !== currentUserId) {
      return {
        ok: false,
        error: 'You are not an author',
      };
    }

    await this.newsRepository.delete({ id });
    return {
      ok: true,
    };
  }

  async finById(id: number): Promise<News> {
    return await this.newsRepository.findOne({ where: { id } });
  }
}
