import Faker from 'faker';
import { define } from 'typeorm-seeding';

import { User } from '../entities/user.entity';
import { ROLE } from '../../auth/constants/role.constant';

define(User,(faker: typeof Faker) => {
  const user = new User();
  user.isAccountDisabled = false;
  user.password = 'password';
  user.name = faker.name.firstName(1);
  user.username = user.name;
  user.roles = ROLE.USER;
  user.email = faker.internet.email(user.name).toLocaleLowerCase();
  return user;
});
