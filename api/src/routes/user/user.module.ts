import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig, TypeOrmEntityConfig } from '@config/index';
import { Microservice } from '@lib/enum/microservices.enum';
import { ConfigModule } from '@nestjs/config';
import { UserController } from './user.controller';

@Module({
	imports: [
		TypeOrmModule.forFeature(TypeOrmEntityConfig.getEntitiesOf(Microservice.USER)),
		TypeOrmModule.forRootAsync({ useClass: TypeOrmConfig }),
		ConfigModule.forRoot()
	],
	controllers: [UserController],
	providers: [UserService],
	exports: [UserService]
})
export class UsersModule {}
