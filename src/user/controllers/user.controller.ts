import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Transactional } from 'typeorm-transactional-cls-hooked';

import { ROLE } from '../../auth/constants/role.constant';
import { Roles } from '../../auth/decorators/role.decorator';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { PaginationParamsDto } from '../../shared/dtos/pagination-params.dto';
import { AppLogger } from '../../shared/logger/logger.service';
import { ReqContext } from '../../shared/request-context/req-context.decorator';
import { RequestContext } from '../../shared/request-context/request-context.dto';
import { UserOutput, UserResponse, UsersResponse } from '../dtos/user-output.dto';
import { UpdateUserInput } from '../dtos/user-update-input.dto';
import { UserService } from '../services/user.service';
import { ApiSwCommon } from '../../shared/decorators/apiSwCommon.decorator';

@Controller('users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@UseInterceptors(ClassSerializerInterceptor)
@Roles(ROLE.ADMIN)

export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly logger: AppLogger,
  ) {
    this.logger.setContext(UserController.name);
  }

  @Get('me')
  @Roles(ROLE.ADMIN, ROLE.USER)
  @ApiSwCommon('Get user me API', UserResponse)
  async getMyProfile(
    @ReqContext() ctx: RequestContext,
  ): Promise<UserResponse> {
    this.logger.log(ctx, `${this.getMyProfile.name} was called`);

    const user = await this.userService.findById(ctx, ctx.user.id);
    return { data: user, meta: {} };
  }

  @Get()
  @ApiSwCommon('Get users as a list API', UsersResponse)
  async getUsers(
    @ReqContext() ctx: RequestContext,
    @Query() query: PaginationParamsDto,
  ): Promise<UsersResponse> {
    this.logger.log(ctx, `${this.getUsers.name} was called`);

    const { users, count } = await this.userService.getUsers(
      ctx,
      query.limit,
      query.offset,
    );

    return { data: users, meta: { count } };
  }

  @Get(':id')
  @ApiSwCommon('Get user by id API', UserResponse)
  async getUser(
    @ReqContext() ctx: RequestContext,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UserResponse> {
    this.logger.log(ctx, `${this.getUser.name} was called`);
    const user = await this.userService.getUserById(ctx, id);

    return { data: user, meta: {} };
  }

  @Patch(':id')
  @Transactional()
  @ApiSwCommon('Update user API', UserResponse)
  async updateUser(
    @ReqContext() ctx: RequestContext,
    @Param('id', ParseIntPipe) userId: number,
    @Body() input: UpdateUserInput,
  ): Promise<UserResponse> {
    this.logger.log(ctx, `${this.updateUser.name} was called`);
    const user = await this.userService.updateUser(ctx, userId, input);
    return { data: user, meta: {} };
  }
}
