import { ApiProperty } from '@nestjs/swagger';

export class HeadersDto {
	@ApiProperty({ type: 'string' })
	'user-agent': string;

	@ApiProperty({ type: 'string' })
	'content-type': string;

	@ApiProperty({ type: 'string' })
	authorization: string;

	@ApiProperty({ type: 'string' })
	host: string;

	@ApiProperty({ type: 'string' })
	connection: string;
}
