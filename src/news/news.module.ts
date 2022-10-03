import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsResolver } from './news.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsRepository } from './news.repository';

@Module({
  imports: [TypeOrmModule.forFeature([NewsRepository])],
  providers: [NewsResolver, NewsService],
})
export class NewsModule {}
