import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateAccountInPut } from './dtos/createAccount.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) //User Entity를 Repository로 inject
    private readonly users: Repository<User>, // private readonly jwtService: JwtService,
  ) {}

  async createAccount({
    username,
    email,
    password,
  }: CreateAccountInPut): Promise<{ ok: boolean; error?: string }> {
    try {
      const exists = await this.users.findOne({
        where: [{ username }, { email }],
      });
      if (exists) {
        return { ok: false, error: 'There is a user with that email already' };
      }

      const user = await this.users.save(
        this.users.create({ username, email, password }),
      );
      return { ok: true };
    } catch (e) {
      // make error
      console.log(e);
      return { ok: false, error: 'Could not create account' };
    }
  }
}
