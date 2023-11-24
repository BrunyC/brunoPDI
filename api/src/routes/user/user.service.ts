import * as bcrypt from 'bcrypt';
import { HttpStatus, HttpException, Injectable } from '@nestjs/common';
import { ResponseTypeDto } from '@lib/dto/general/index';
import { UserCredentialsDto } from 'lib/src/dto/api';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User)
		private userRepository: Repository<User>
	) {}
	async signUp(userCredentialsDto: UserCredentialsDto): Promise<ResponseTypeDto> {
		const { username, password } = userCredentialsDto;

		const user = new User();
		user.username = username;
		user.salt = await bcrypt.genSalt();
		user.password = await this.hashPassword(password, user.salt);

		try {
			const result = await this.userRepository.save(user);

			if (!result) throw new HttpException('Cannot save the user', HttpStatus.INTERNAL_SERVER_ERROR);

			return {
				data: {
					statusCode: HttpStatus.CREATED,
					message: `User [${user.username}] registered successfully`
				}
			};
		} catch (error) {
			if (error.code === 11000) {
				// duplicated username
				throw new HttpException('Username already exists.', HttpStatus.CONFLICT);
			}

			throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async validatePassword(userCredentialsDto: UserCredentialsDto): Promise<string | null> {
		const { username, password } = userCredentialsDto;

		const user = await this.userRepository.findOneBy({ username });

		if (user && (await user.validatePassword(password))) {
			return user.username;
		}

		return null;
	}

	async hashPassword(password: string, salt: string): Promise<string> {
		return bcrypt.hash(password, salt);
	}

	async removeUserByUsername(username: string): Promise<void> {
		await this.userRepository.delete({ username });
	}
}
