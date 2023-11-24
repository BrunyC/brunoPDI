import { Body, Controller, Delete, Get, Param, Post, UseFilters, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import {
	ApiBadRequestResponse,
	ApiBody,
	ApiCreatedResponse,
	ApiHeader,
	ApiInternalServerErrorResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiTags,
	ApiUnauthorizedResponse
} from '@nestjs/swagger';
import { GatewayExceptionFilter } from '@lib/filter/index';
import { ResponseTransformInteceptor } from '@lib/interceptors/response.interceptor';
import { ItemDto } from 'lib/src/dto/microservices/cart';
import { ResponseTypeDto } from '@lib/dto/general/response-type.dto';
import { CartService } from './cart.service';

@ApiTags('Cart')
@Controller('cart')
@UseFilters(GatewayExceptionFilter)
@ApiHeader({
	name: 'Authorization',
	description: 'Bearer {{ access_token }}',
	required: true
})
export class CartController {
	constructor(private readonly cartService: CartService) {}

	@Get('/:id')
	@UseInterceptors(ResponseTransformInteceptor)
	@ApiOkResponse({ type: ResponseTypeDto, description: 'Cart found.' })
	@ApiBadRequestResponse({ type: ResponseTypeDto, description: 'An error ocurred. A message explaining will be notified.' })
	@ApiNotFoundResponse({ type: ResponseTypeDto, description: 'No records found with these parameters.' })
	@ApiInternalServerErrorResponse({ type: ResponseTypeDto, description: 'An error ocurred. A message explaining will be notified.' })
	@ApiUnauthorizedResponse({ type: ResponseTypeDto, description: 'Unauthorized' })
	async getCart(@Param('id') userId: string): Promise<ResponseTypeDto> {
		return this.cartService.getCart(userId);
	}

	@Post('/addItem/:id')
	@UseInterceptors(ResponseTransformInteceptor)
	@UsePipes(new ValidationPipe({ transform: true, whitelist: true, forbidUnknownValues: true }))
	@ApiBody({
		type: ItemDto,
		description: 'The body request is a json.'
	})
	@ApiCreatedResponse({ type: ResponseTypeDto, description: 'The cart has been successfully created.' })
	@ApiBadRequestResponse({ type: ResponseTypeDto, description: 'An error occurred. A message explaining will be notified.' })
	@ApiInternalServerErrorResponse({ type: ResponseTypeDto, description: 'An error occurred. A message explaining will be notified.' })
	@ApiUnauthorizedResponse({ type: ResponseTypeDto, description: 'Unauthorized' })
	async addItemToCart(@Param('id') userId: string, @Body() item: ItemDto): Promise<ResponseTypeDto> {
		return this.cartService.addItemToCart(userId, item);
	}

	@Delete('deleteItem/:id')
	@UsePipes(new ValidationPipe({ transform: true, whitelist: true, forbidUnknownValues: true }))
	@ApiBody({
		description: 'The body request is a json.'
	})
	@ApiOkResponse({ type: ResponseTypeDto, description: 'Item has been successfully removed.' })
	@ApiBadRequestResponse({ type: ResponseTypeDto, description: 'An error occurred. A message explaining will be notified.' })
	@ApiInternalServerErrorResponse({ type: ResponseTypeDto, description: 'An error occurred. A message explaining will be notified.' })
	@ApiUnauthorizedResponse({ type: ResponseTypeDto, description: 'Unauthorized' })
	async deleteItemFromCart(@Param('id') userId: string, @Body() { productId }): Promise<ResponseTypeDto> {
		return this.cartService.deleteItemFromCart(userId, productId);
	}

	@Delete('delete/:id')
	@UsePipes(new ValidationPipe({ transform: true, whitelist: true, forbidUnknownValues: true }))
	@ApiOkResponse({ type: ResponseTypeDto, description: 'The cart has been successfully removed.' })
	@ApiBadRequestResponse({ type: ResponseTypeDto, description: 'An error occurred. A message explaining will be notified.' })
	@ApiInternalServerErrorResponse({ type: ResponseTypeDto, description: 'An error occurred. A message explaining will be notified.' })
	@ApiUnauthorizedResponse({ type: ResponseTypeDto, description: 'Unauthorized' })
	async deleteCart(@Param('id') userId: string): Promise<ResponseTypeDto> {
		return this.cartService.deleteCart(userId);
	}
}
