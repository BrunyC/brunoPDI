import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserCredentialsDto, AccessTokenDto } from '@lib/dto/api/index';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt/jwt.payload';
import { ConfigService } from '@nestjs/config';
import { UserService } from '@api/routes/user/user.service';

@Injectable()
export class AuthService {
	constructor(protected configService: ConfigService, private userService: UserService, private jwtService: JwtService) {}

	async getAccessToken(userCredentialsDto: UserCredentialsDto): Promise<AccessTokenDto> {
		const username = await this.userService.validatePassword(userCredentialsDto);
		const expirationTime = this.configService.get<string>('JWT_TOKEN_EXPIRATION_TIME');
		// Value parsed to milliseconds.
		const expiresIn = (new Date().getTime() + parseInt(expirationTime) * 1000).toString();

		if (!username) {
			throw new UnauthorizedException('Invalid credentials.');
		}

		const payload: JwtPayload = { username };
		const accessToken = this.jwtService.sign(payload);

		return {
			accessToken,
			expiresIn
		};
	}
}
