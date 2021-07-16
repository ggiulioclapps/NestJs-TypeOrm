import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

import { ROLE,RolesType } from '../../auth/constants/role.constant';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column()
  password: string;

  @Unique('username', ['username'])
  @Column({ length: 200 })
  username: string;

  @Column({ type: 'enum', enum: ROLE, default: 'USER' })
  roles: RolesType;

  @Column()
  isAccountDisabled: boolean;

  @Unique('email', ['email'])
  @Column({ length: 200 })
  email: string;

  @CreateDateColumn({ name: 'createdAt', nullable: true })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updatedAt', nullable: true })
  updatedAt: Date;

  // @BeforeInsert()
  // @BeforeUpdate()
  // async setPassword() {
  //   if (this.password) {
  //     this.password = await hash(this.password, 10);
  //   }
  // }
}
