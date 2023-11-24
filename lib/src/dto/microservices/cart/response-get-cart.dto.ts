import { ApiProperty } from '@nestjs/swagger';
import { Cart } from 'microservices/cart/src/entity';

export class ResponseGetCartDto {
	@ApiProperty({ type: Cart })
	data: Cart;
}
