import { Injectable } from '@nestjs/common';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { Microservice } from '@lib/enum/index';
import { Cart } from '@cart/entity';
import { User } from '@api/routes/user/entity/user.entity';

@Injectable()
export class TypeOrmEntityConfig {
	public static getEntitiesOf(microservice: string): EntityClassOrSchema[] {
		const entitiesOf = {
			[Microservice.CART]: () => [Cart],
			[Microservice.USER]: () => [User]
		};

		return entitiesOf[microservice]();
	}
}
