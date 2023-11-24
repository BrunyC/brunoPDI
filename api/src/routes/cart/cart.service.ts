import { MicroserviceProxy } from '@config/index';
import { ResponseTypeDto } from '@lib/dto/general/response-type.dto';
import { CartPattern, Microservice } from '@lib/enum/index';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ItemDto } from 'lib/src/dto/microservices/cart';

@Injectable()
export class CartService {
	constructor(@Inject(MicroserviceProxy.MICROSERVICE_PROXY_SERVICE) private publish: MicroserviceProxy) {}

	async getCart(userId): Promise<ResponseTypeDto> {
		const { data } = await this.publish.message(Microservice.CART, CartPattern.GET_CART, userId);

		if (!data)
			return {
				data: {
					statusCode: HttpStatus.NOT_FOUND,
					message: 'Nenhum registro encontrado.'
				}
			};

		return data;
	}

	async addItemToCart(userId: string, item: ItemDto): Promise<ResponseTypeDto> {
		return this.publish.message(Microservice.CART, CartPattern.ADD_ITEM, { userId, item });
	}

	async deleteItemFromCart(userId: string, productId: string): Promise<ResponseTypeDto> {
		return this.publish.message(Microservice.CART, CartPattern.REMOVE_ITEM_FROM_CART, { userId, productId });
	}

	async deleteCart(userId: string): Promise<ResponseTypeDto> {
		return this.publish.message(Microservice.CART, CartPattern.REMOVE_CART, userId);
	}
}
