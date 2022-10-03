import { News } from './entities/news.entity';
import { Repository } from 'typeorm';

export class NewsRepository extends Repository<News> {}
