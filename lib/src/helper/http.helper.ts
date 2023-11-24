import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Agent } from 'https';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class HttpHelper {
	private logger = new Logger();

	constructor(private httpService: HttpService) {}

	/**
	 * Handle HTTP GET requests.
	 *
	 * @returns data: any
	 * @throws HttpException
	 */
	public async GET(
		host: string,
		endpoint: string,
		headers: any,
		param?: string,
		getContent?: boolean,
		timeout: number = null
	): Promise<any> {
		try {
			const url: string = param ? `${host}${endpoint}/${param}` : `${host}${endpoint}`;
			const config: any = {
				headers,
				timeout
			};

			this.logger.log(url, 'GET');

			const { data } = await lastValueFrom(this.httpService.get(url, config));

			if (data && getContent) return data;

			return data ? true : false;
		} catch (error) {
			const statusCode = error.response ? error.response.status : HttpStatus.BAD_REQUEST;
			const message = error.response ? error.response.data : error.message;

			if (statusCode !== HttpStatus.NOT_FOUND) throw new HttpException(message, statusCode);

			this.logger.log(`${statusCode}: ${message}`);
		}
	}

	/**
	 * Handle HTTP POST requests.
	 *
	 * @returns data: any
	 * @throws HttpException
	 */
	public async POST(
		host: string,
		endpoint: string,
		headers: any,
		body: any | any[],
		getContent?: boolean,
		httpsAgent: Agent = null,
		timeout: number = null
	): Promise<any> {
		try {
			const url = `${host}${endpoint}`;

			this.logger.log(url, 'POST');

			const CONFIG: any = {
				httpsAgent,
				timeout,
				headers,
				maxBodyLength: 52428800
			};

			const { data, status, statusText } = await lastValueFrom(this.httpService.post(url, body, CONFIG));

			if (data && getContent) return { data, status, statusText };

			return { status, statusText };
		} catch (error) {
			const statusCode = error.response ? error.response.status : HttpStatus.BAD_REQUEST;
			const message = error.response && error.response.data ? error.response.data : error.message;

			throw new HttpException(message, statusCode);
		}
	}

	/**
	 * Handle HTTP PUT requests.
	 *
	 * @returns data: any
	 * @throws HttpException
	 */
	public async PUT(host: string, endpoint: string, headers: any, param: string, body: any | any[], getContent?: boolean): Promise<any> {
		try {
			const url: string = param ? `${host}${endpoint}/${param}` : `${host}${endpoint}`;

			this.logger.log(url, 'PUT');

			const { data, status, statusText } = await lastValueFrom(this.httpService.put(url, body, { headers, maxBodyLength: 52428800 }));

			if (data && getContent) return { data, status, statusText };

			return { status, statusText };
		} catch (error) {
			const statusCode = error.response ? error.response.status : HttpStatus.BAD_REQUEST;
			const message = error.response && error.response.data ? error.response.data : error.message;

			throw new HttpException(message, statusCode);
		}
	}

	/**
	 * Handle HTTP DELETE requests.
	 *
	 * @returns data: any
	 * @throws HttpException
	 */
	public async DELETE(host: string, endpoint: string, headers: any, body?: any | any[], getContent?: boolean): Promise<any> {
		try {
			const url = `${host}${endpoint}`;
			const options = body ? { headers, data: body } : { headers };

			this.logger.log(url, 'DELETE');

			const { data } = await lastValueFrom(this.httpService.request({ method: 'DELETE', url: url, ...options }));

			if (data && getContent) return data;

			return data ? true : false;
		} catch (error) {
			const statusCode = error.response ? error.response.status : HttpStatus.BAD_REQUEST;
			const message = error.response && error.response.data ? error.response.data : error.message;

			throw new HttpException(message, statusCode);
		}
	}
}
