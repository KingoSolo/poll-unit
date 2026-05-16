import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../common/entities/user.entity';
import { Repository } from 'typeorm';
import { SignUpDto } from 'src/auth/dto/signup.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository : Repository<User>
    ){}
 

    async findByEmail(email:string){
        return this.userRepository.findOne({
            where:{email}
        })
    }

    async findOne(id: number) {
        return this.userRepository.findOne({ where: { id } })
    }

    async getMe(id: number) {
        const user = await this.userRepository.findOne({
            where: { id },
            relations: ['votes'],
        });
        if (!user) return null;
        const { password, votes, ...rest } = user;
        return {
            ...rest,
            voterId: `NG-${String(user.id).padStart(4, '0')}`,
            verified: true,
            totalPollsParticipated: votes.length,
        };
    }

    async create(dto:SignUpDto){
        const user = this.userRepository.create(dto)
        return this.userRepository.save(user)
    }
}
