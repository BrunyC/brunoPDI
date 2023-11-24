import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ItemDto {
	@ApiProperty({ type: 'string' })
	@IsNotEmpty()
	@IsString()
	productId: string;

	@ApiProperty({ type: 'string' })
	@IsNotEmpty()
	@IsString()
	name: string;

	@ApiProperty({ type: 'number' })
	@IsNotEmpty()
	quantity: number;

	@ApiProperty({ type: 'number' })
	@IsNotEmpty()
	price: number;
}
