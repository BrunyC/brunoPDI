import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { getStatusText } from '../helper';

@Injectable()
export class ResponseTransformInteceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		const http = context.switchToHttp();
		const response = http.getResponse();

		return next.handle().pipe(
			map((data) => ({
				status: response.statusCode,
				statusText: getStatusText.statusText(response.statusCode),
				resData: data.data
			}))
		);
	}
}
