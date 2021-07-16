
import { Exclude, Expose } from 'class-transformer';

import { ROLE } from '../../auth/constants/role.constant';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

export class UserOutput {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  username: string;

  @Expose()
  roles: ROLE[];

  @Expose()
  email: string;

  @Expose()
  isAccountDisabled: boolean;

  @Expose()
  createdAt: string;

  @Expose()
  updatedAt: string;
}

export class UserResponse {
  @Expose()
  data: UserOutput;

  @Expose()
  meta: any;
}

export class UsersResponse {
  @Expose()
  data: Array<UserOutput>;

  @Expose()
  meta: any;
}
