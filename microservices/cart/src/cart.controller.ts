import { Controller } from '@nestjs/common';
import { CartService } from './cart.service';
import { Payload, MessagePattern, Ctx, RmqContext } from '@nestjs/microservices';
import { CartPattern } from '@lib/enum/microservices.pattern.enum';
import { ItemDto } from 'lib/src/dto/microservices/cart';

@Controller()
export class CartController {
	constructor(private cartService: CartService) {}

	@MessagePattern(CartPattern.GET_CART)
	async getCart(@Payload() userId: string, @Ctx() context: RmqContext): Promise<any> {
		const channel = context.getChannelRef();
		const message = context.getMessage();

		try {
			const result = await this.cartService.getCart(userId);

			channel.ack(message);

			return result;
		} catch (error) {
			channel.ack(message);

			throw error;
		}
	}

	@MessagePattern(CartPattern.ADD_ITEM)
	async addItemToCart(@Payload() data: { userId: string; item: ItemDto }, @Ctx() context: RmqContext): Promise<any> {
		const channel = context.getChannelRef();
		const message = context.getMessage();

		try {
			const result = await this.cartService.addItemToCart(data.userId, data.item);

			channel.ack(message);

			return result;
		} catch (error) {
			channel.ack(message);

			throw error;
		}
	}

	@MessagePattern(CartPattern.REMOVE_ITEM_FROM_CART)
	async deleteItemFromCart(@Payload() data: { userId: string; productId: string }, @Ctx() context: RmqContext): Promise<any> {
		const channel = context.getChannelRef();
		const message = context.getMessage();

		try {
			const result = await this.cartService.deleteItemFromCart(data.userId, data.productId);

			channel.ack(message);

			return result;
		} catch (error) {
			channel.ack(message);

			throw error;
		}
	}

	@MessagePattern(CartPattern.REMOVE_CART)
	async deleteCart(@Payload() userId: string, @Ctx() context: RmqContext): Promise<any> {
		const channel = context.getChannelRef();
		const message = context.getMessage();

		try {
			const result = await this.cartService.deleteCart(userId);

			channel.ack(message);

			return result;
		} catch (error) {
			channel.ack(message, false, false);

			throw error;
		}
	}
}
