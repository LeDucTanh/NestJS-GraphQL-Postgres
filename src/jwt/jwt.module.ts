import { DynamicModule, Global, Module } from '@nestjs/common';
import { CONFIG_OPTIONS } from '../common/common.constants';
import { JwtAuthGuard } from './jwt.guard';
import { JwtModuleOptions } from './jwt.interfaces';
import { JwtService } from './jwt.service';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [UsersModule, PassportModule],
})
@Global()
export class JwtModule {
  static forRoot(options: JwtModuleOptions): DynamicModule {
    return {
      module: JwtModule,
      exports: [JwtService],
      providers: [
        { provide: CONFIG_OPTIONS, useValue: options },
        JwtService,
        JwtStrategy,
        JwtAuthGuard,
      ],
    };
  }
}
