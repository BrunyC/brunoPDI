import { Microservice } from '@lib/enum/index';
import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { MongoDBConfig } from './mongodb.config';
import { TypeOrmEntityConfig } from './typeorm.entity.config';

@Injectable()
export class TypeOrmConfig implements TypeOrmOptionsFactory {
	private mongoDbConfig: MongoDBConfig;

	constructor() {
		this.mongoDbConfig = new MongoDBConfig();
	}

	createTypeOrmOptions(): TypeOrmModuleOptions {
		return {
			type: this.mongoDbConfig.getScheme(),
			url: this.mongoDbConfig.getUrl(),
			replicaSet: this.mongoDbConfig.getReplicaSetName(),
			readPreference: this.mongoDbConfig.getReadPreference(),
			database: this.mongoDbConfig.getDatabaseName(),
			useNewUrlParser: true,
			synchronize: true,
			logging: true,
			useUnifiedTopology: true,
			entities: [...TypeOrmEntityConfig.getEntitiesOf(Microservice.CART), ...TypeOrmEntityConfig.getEntitiesOf(Microservice.USER)]
		};
	}
}
