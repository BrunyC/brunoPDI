import { plainToClass } from 'class-transformer';
import { IsNotEmpty, IsNumber, validateSync } from 'class-validator';

export class EnvironmentVariables {
	@IsNumber()
	@IsNotEmpty()
	PORT: number;
}

export function validate(config: Record<string, unknown>): EnvironmentVariables {
	const validatedConfig = plainToClass(EnvironmentVariables, config, { enableImplicitConversion: true });

	const errors = validateSync(validatedConfig, { skipMissingProperties: false });

	if (errors.length > 0) {
		throw new Error(
			errors
				.map(
					(e) => `\n\n ${e.property} has failed the following constraints: [${Object.keys(e.constraints).join(', ').toString()}]`
				)
				.toString()
		).message;
	}

	return validatedConfig;
}
