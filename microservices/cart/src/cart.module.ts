import { RabbitMQModule, TypeOrmConfig, TypeOrmEntityConfig } from '@config/index';
import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Microservice } from '@lib/enum/index';
import { ConfigModule } from '@nestjs/config';
import { LogsModule } from '@logs/logs.module';

@Module({
	imports: [
		TypeOrmModule.forFeature(TypeOrmEntityConfig.getEntitiesOf(Microservice.CART)),
		TypeOrmModule.forRootAsync({ useClass: TypeOrmConfig }),
		ConfigModule.forRoot(),
		RabbitMQModule,
		LogsModule
	],
	controllers: [CartController],
	providers: [CartService],
	exports: [CartService]
})
export class CartModule {}
