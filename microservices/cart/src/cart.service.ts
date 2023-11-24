import { ExceptionObjectDto } from '@lib/dto/general/index';
import { HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './entity';
import { ItemDto } from 'lib/src/dto/microservices/cart';
import { MicroserviceProxy } from '@config/index';
import { LogPattern, Microservice } from '@lib/enum/index';

@Injectable()
export class CartService {
	constructor(
		@Inject(MicroserviceProxy.MICROSERVICE_PROXY_SERVICE) private publish: MicroserviceProxy,
		@InjectRepository(Cart)
		private cartRepository: Repository<Cart>
	) {}

	async getCart(userId: string): Promise<any> {
		return this.cartRepository
			.findOneBy({ userId })
			.then((result) => {
				return { data: result };
			})
			.catch((error) => {
				throw new RpcException(ExceptionObjectDto.generate(HttpStatus.BAD_REQUEST, error.message));
			});
	}

	async createCart(userId: string, item: ItemDto, subTotalPrice: number): Promise<any> {
		return this.cartRepository
			.insert({
				userId,
				items: [{ ...item, subTotalPrice }],
				totalPrice: subTotalPrice
			})
			.then(() => {
				Logger.log('Cart successfully created', 'CreateCart');

				return { data: { statusCode: HttpStatus.CREATED, message: 'Cart inserido com sucesso.' } };
			})
			.catch((error) => {
				throw new RpcException(ExceptionObjectDto.generate(HttpStatus.BAD_REQUEST, error.message));
			});
	}

	async addItemToCart(userId: string, itemDto: ItemDto): Promise<Cart> {
		const { productId, quantity, price } = itemDto;
		const subTotalPrice = quantity * price;

		await this.publish.event(Microservice.LOG, LogPattern.ADD_LOG, {
			message: 'Item adicionado ao carrinho.',
			user: '123456',
			content: 'cart'
		});

		let { data } = await this.getCart(userId);

		if (data) {
			const itemIndex = data.items.findIndex((item) => item.productId == productId);

			if (itemIndex > -1) {
				const item = data.items[itemIndex];
				item.quantity = Number(item.quantity) + Number(quantity);
				item.subTotalPrice = item.quantity * item.price;

				data.items[itemIndex] = item;
				data = this.recalculateCart(data);

				return data.save();
			} else {
				data.items.push({ ...itemDto, subTotalPrice });
				data = this.recalculateCart(data);

				return data.save();
			}
		} else {
			const newCart = await this.createCart(userId, itemDto, subTotalPrice);

			return newCart;
		}
	}

	private recalculateCart(cart: Cart) {
		cart.totalPrice = 0;
		cart.items.forEach((item) => {
			cart.totalPrice += item.quantity * item.price;
		});

		return cart;
	}

	async deleteItemFromCart(userId: string, productId: string): Promise<any> {
		let { data } = await this.getCart(userId);

		const itemIndex = data.items.findIndex((item) => item.productId == productId);

		if (itemIndex > -1) {
			data.items.splice(itemIndex, 1);
			data = this.recalculateCart(data);

			return data.save();
		}

		await this.publish.event(Microservice.LOG, LogPattern.ADD_LOG, {
			message: 'Item excluido com sucesso.',
			user: userId,
			content: 'cart'
		});
	}

	async deleteCart(userId: string): Promise<any> {
		await this.publish.event(Microservice.LOG, LogPattern.ADD_LOG, {
			message: 'Carrinho excluido com sucesso.',
			user: userId,
			content: 'cart'
		});
		return this.cartRepository.delete({ userId });
	}
}
