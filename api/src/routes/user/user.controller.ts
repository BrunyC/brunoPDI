import { Body, Controller, Post, UseFilters, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import {
	ApiBadRequestResponse,
	ApiBody,
	ApiCreatedResponse,
	ApiInternalServerErrorResponse,
	ApiTags,
	ApiUnauthorizedResponse
} from '@nestjs/swagger';
import { GatewayExceptionFilter } from '@lib/filter/index';
import { ResponseTransformInteceptor } from '@lib/interceptors/response.interceptor';
import { ResponseTypeDto } from '@lib/dto/general/response-type.dto';
import { UserService } from './user.service';
import { UserCredentialsDto } from '@lib/dto/api/index';

@ApiTags('User')
@Controller('user')
@UseFilters(GatewayExceptionFilter)
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post()
	@UseInterceptors(ResponseTransformInteceptor)
	@UsePipes(new ValidationPipe({ transform: true, whitelist: true, forbidUnknownValues: true }))
	@ApiBody({
		type: UserCredentialsDto,
		description: 'The body request is a json.'
	})
	@ApiCreatedResponse({ type: ResponseTypeDto, description: 'The user has been successfully created.' })
	@ApiBadRequestResponse({ type: ResponseTypeDto, description: 'An error occurred. A message explaining will be notified.' })
	@ApiInternalServerErrorResponse({ type: ResponseTypeDto, description: 'An error occurred. A message explaining will be notified.' })
	@ApiUnauthorizedResponse({ type: ResponseTypeDto, description: 'Unauthorized' })
	async addItemToCart(@Body() data: UserCredentialsDto): Promise<ResponseTypeDto> {
		return this.userService.signUp(data);
	}
}
