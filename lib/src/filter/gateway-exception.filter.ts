import { ExceptionFilter, Catch, ArgumentsHost, HttpException, BadRequestException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class GatewayExceptionFilter implements ExceptionFilter {
	/**
	 * If an exception is thrown, catch it and send it to the client
	 * @param {HttpException} exception - The exception that was thrown.
	 * @param {ArgumentsHost} host - ArgumentsHost
	 */
	async catch(exception: HttpException, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();

		let message = exception instanceof BadRequestException ? exception.getResponse()['message'] : exception['message'];
		let statusCode = exception instanceof HttpException ? exception.getStatus() : Number(exception['statusCode']);

		!statusCode && (statusCode = HttpStatus.INTERNAL_SERVER_ERROR);
		!message && (message = 'An unexpected error occurred, please contact the system administrator.');

		response.status(statusCode).json({ statusCode, message });
	}
}
