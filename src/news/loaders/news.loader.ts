import { Injectable, Scope } from '@nestjs/common';
import { UsersService } from '../../users/users.service';
import * as DataLoader from 'dataloader';
import { Mapper } from '../../common/mapper';
import { User } from 'src/users/entities/user.entity';

@Injectable({ scope: Scope.REQUEST })
export class NewsLoader {
  publishersMapper = new Mapper<User>();

  constructor(private readonly userService: UsersService) {}

  public readonly batchPublishers = new DataLoader<number, User>(
    async (publisherIds: number[]) => {
      const authors = await this.userService.findByIds(publisherIds);
      return this.publishersMapper.mapObjectsToId(authors, publisherIds);
    },
  );
}
