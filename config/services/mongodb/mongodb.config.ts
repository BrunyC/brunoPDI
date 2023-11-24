import { ConfigService } from '@nestjs/config';
import { ReadPreference } from 'mongodb';

export class MongoDBConfig {
	private scheme: any = 'mongodb';
	private url: string;
	private username: string;
	private password: string;
	private host: string;
	private port: string;
	private database: string;
	private replicaSetName: string = null;
	private readPreference: string = ReadPreference.PRIMARY;
	private databaseName: string = null;
	private envVariables: ConfigService;

	constructor() {
		this.envVariables = new ConfigService();
		this.setVariables();
	}

	public setVariables() {
		this.host = this.envVariables.get('MONGODB_HOST');
		this.port = this.envVariables.get('MONGODB_PORT');
		this.database = this.envVariables.get('MONGODB_DATABASE');
		this.url = `${this.scheme}://${this.host}:${this.port}/${this.database}`;
	}

	public getUrl(): string {
		return this.url;
	}

	public getScheme(): any {
		return this.scheme;
	}

	public getReplicaSetName(): string {
		return this.replicaSetName;
	}

	public getReadPreference(): string {
		return this.readPreference;
	}

	public getDatabaseName(): string {
		return this.databaseName;
	}
}
