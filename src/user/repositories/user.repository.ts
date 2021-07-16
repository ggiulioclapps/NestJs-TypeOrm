import { NotFoundException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';

import { User } from '../entities/user.entity';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';

@EntityRepository(User)
export class UserRepository extends BaseRepository<User> {
  async getById(id: number): Promise<User> {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }
}
