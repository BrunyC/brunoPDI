import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { version, description } from 'package.json';
import helmet from 'helmet';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	const configService = app.get(ConfigService);

	app.use(helmet());

	const swaggerApiOptions = new DocumentBuilder()
		.setTitle('Cart Project Documentation')
		.setDescription(description)
		.setVersion(version)
		.build();

	const swaggerApiDocument: OpenAPIObject = SwaggerModule.createDocument(app, swaggerApiOptions);
	SwaggerModule.setup('api/docs', app, swaggerApiDocument);

	await app.listen(configService.get('PORT'));
}

bootstrap();
