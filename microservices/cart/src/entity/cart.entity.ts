import { Column, BaseEntity, Entity, ObjectIdColumn, ObjectId } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

class Items {
	@ApiProperty({ type: 'string' })
	@Column()
	userId: string;

	@ApiProperty({ type: 'string' })
	@Column()
	productId: string;

	@ApiProperty({ type: 'string' })
	@Column()
	name: string;

	@ApiProperty({ type: 'number' })
	@Column()
	quantity: number;

	@ApiProperty({ type: 'number' })
	@Column()
	price: number;

	@ApiProperty({ type: 'number' })
	@Column()
	subTotalPrice: number;
}

@Entity()
export class Cart extends BaseEntity {
	@ApiProperty({ type: 'string' })
	@ObjectIdColumn()
	_id: ObjectId;

	@ApiProperty({ type: 'string' })
	@Column()
	userId: string;

	@ApiProperty({ type: [Items] })
	@Column()
	items: Items[];

	@ApiProperty({ type: 'number' })
	@Column()
	totalPrice: number;
}
