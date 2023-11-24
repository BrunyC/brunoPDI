import { Microservice } from '@lib/enum/index';
import { MicroserviceType, MicroservicePattern } from '@lib/type/index';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class MicroserviceProxy {
	public static readonly MICROSERVICE_PROXY_SERVICE = 'MICROSERVICE_PROXY_SERVICE';

	constructor(
		@Inject(Microservice.USER) private readonly microserviceUser: ClientProxy,
		@Inject(Microservice.CART) private readonly microserviceCart: ClientProxy,
		@Inject(Microservice.LOG) private readonly microserviceLog: ClientProxy
	) {}

	public async message(microserviceName: MicroserviceType, pattern: MicroservicePattern, message: any | any[]): Promise<any> {
		const microservice = this.getClientProxyByMicroservice(microserviceName);

		return lastValueFrom(microservice.send(pattern, message));
	}

	public async event(microserviceName: MicroserviceType, pattern: MicroservicePattern, message: any | any[]): Promise<any> {
		const microservice = this.getClientProxyByMicroservice(microserviceName);

		return lastValueFrom(microservice.emit(pattern, message));
	}

	public getClientProxyByMicroservice(name: MicroserviceType): ClientProxy {
		const microservice = {
			[Microservice.USER]: () => this.microserviceUser,
			[Microservice.CART]: () => this.microserviceCart,
			[Microservice.LOG]: () => this.microserviceLog
		};

		return microservice[name]();
	}
}
