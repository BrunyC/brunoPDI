import { Microservice } from '@lib/enum/index';
import { Module } from '@nestjs/common';
import { ClientProxyFactory } from '@nestjs/microservices';
import { MicroserviceProxy } from './microservice-proxy';
import { RabbitMQConfig } from './rabbitmq.config';

@Module({
	imports: [],
	providers: [
		{
			provide: Microservice.USER,
			useFactory: (rabbitMqConfig: RabbitMQConfig) => {
				rabbitMqConfig = new RabbitMQConfig();
				return ClientProxyFactory.create(rabbitMqConfig.getOptions(Microservice.USER));
			}
		},
		{
			provide: Microservice.CART,
			useFactory: (rabbitMqConfig: RabbitMQConfig) => {
				rabbitMqConfig = new RabbitMQConfig();
				return ClientProxyFactory.create(rabbitMqConfig.getOptions(Microservice.CART));
			}
		},
		{
			provide: Microservice.LOG,
			useFactory: (rabbitMqConfig: RabbitMQConfig) => {
				rabbitMqConfig = new RabbitMQConfig();
				return ClientProxyFactory.create(rabbitMqConfig.getOptions(Microservice.LOG));
			}
		},
		{
			provide: MicroserviceProxy.MICROSERVICE_PROXY_SERVICE,
			useClass: MicroserviceProxy
		}
	],
	exports: [
		{
			provide: MicroserviceProxy.MICROSERVICE_PROXY_SERVICE,
			useClass: MicroserviceProxy
		}
	]
})
export class RabbitMQModule {}
