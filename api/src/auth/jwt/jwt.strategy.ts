import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from './jwt.payload';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { User } from '@api/routes/user/entity/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		protected configService: ConfigService,
		@InjectRepository(User)
		private userRepository: Repository<User>
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: configService.get<string>('JWT_SECRET_PHRASE')
		});
	}

	async validate(payload: JwtPayload) {
		const { username } = payload;
		const user = await this.userRepository.findOneBy({ username });

		if (!user) {
			throw new UnauthorizedException();
		}

		return user;
	}
}
