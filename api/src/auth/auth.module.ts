import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from '@api/routes/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmEntityConfig } from '@config/index';
import { Microservice } from '@lib/enum/index';

const configService = new ConfigService();
@Module({
	imports: [
		TypeOrmModule.forFeature(TypeOrmEntityConfig.getEntitiesOf(Microservice.USER)),
		ConfigModule.forRoot(),
		PassportModule.register({ defaultStrategy: 'jwt' }),
		JwtModule.register({
			secret: configService.get('JWT_SECRET_PHRASE'),
			signOptions: {
				expiresIn: Number(configService.get('JWT_TOKEN_EXPIRATION_TIME'))
			}
		}),
		UsersModule
	],
	controllers: [AuthController],
	providers: [AuthService, JwtStrategy],
	exports: [JwtStrategy, PassportModule]
})
export class AuthModule {}
