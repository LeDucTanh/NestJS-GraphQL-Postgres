import { CategoryModule } from './../category/category.module';
import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsResolver } from './news.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { News } from './entities/news.entity';

@Module({
  imports: [TypeOrmModule.forFeature([News]), CategoryModule],
  providers: [NewsResolver, NewsService],
})
export class NewsModule {}
