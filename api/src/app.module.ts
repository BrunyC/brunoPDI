import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as validationSchema from '@lib/validators/index';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig, RabbitMQModule } from '@config/index';
import { CartModule } from './routes/cart/cart.module';
import { UsersModule } from './routes/user/user.module';
import { AuthModule } from './auth/auth.module';
import { LogsModule } from './routes/logs/logs.module';

@Global()
@Module({
	imports: [
		ConfigModule.forRoot({
			validationSchema
		}),
		TypeOrmModule.forRootAsync({ useClass: TypeOrmConfig }),
		AuthModule,
		RabbitMQModule,
		UsersModule,
		CartModule,
		LogsModule
	],
	exports: [RabbitMQModule, ConfigModule.forRoot()],
	providers: []
})
export class AppModule {}
