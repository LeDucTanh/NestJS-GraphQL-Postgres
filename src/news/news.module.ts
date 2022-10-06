import { UsersModule } from './../users/users.module';
import { CategoryModule } from './../category/category.module';
import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsResolver } from './news.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { News } from './entities/news.entity';
import { NewsLoader } from './loaders/news.loader';

@Module({
  imports: [TypeOrmModule.forFeature([News]), CategoryModule, UsersModule],
  providers: [NewsResolver, NewsService, NewsLoader],
})
export class NewsModule {}
