import { JwtAuthGuard } from './../jwt/jwt.guard';
import { User } from './entities/user.entity';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import {
  CreateAccountInPut,
  CreateAccountOutPut,
} from './dtos/createAccount.dto';
import { LoginInput, LoginOutPut } from './dtos/login.dto';
import { UseGuards } from '@nestjs/common';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User])
  @UseGuards(JwtAuthGuard)
  users(): [] {
    return [];
  }

  @Mutation(() => CreateAccountOutPut)
  async createAccount(
    @Args('input')
    createAccountInput: CreateAccountInPut,
  ): Promise<CreateAccountOutPut> {
    return this.usersService.createAccount(createAccountInput);
  }

  @Mutation(() => LoginOutPut)
  async login(@Args('input') loginInput: LoginInput): Promise<LoginOutPut> {
    return this.usersService.login(loginInput);
  }
}
