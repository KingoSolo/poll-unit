import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Poll } from '../common/entities/poll.entity';
import { Repository } from 'typeorm';
import { CreatePollsDto } from './dto/createPolls.dto';
import { pollStatus } from '../common/enums/pollStatus.enums';
import { PollOption } from '../common/entities/pollOption.entity';
import { UpdatePollsDto } from './dto/updatePolls.dto';
import { UserRole } from 'src/common/enums/userRole.enums';

@Injectable()
export class PollsService {
    constructor(
        @InjectRepository(Poll)
        private pollsRepository : Repository<Poll>,

        @InjectRepository(PollOption)
        private pollsOptionRepository : Repository<PollOption>
    ){}

    async create(dto:CreatePollsDto,userId:number){
        const poll = this.pollsRepository.create({
            title : dto.title,
            description : dto.description,
            createdBy:{id:userId},
            status:pollStatus.ACTIVE
        })
        const savedPoll =  await this.pollsRepository.save(poll);
            
        const options =  dto.options.map((opt) => {
            return this.pollsOptionRepository.create({
                optionText:opt,
                poll:{id:savedPoll.id}
            })
        })

        await this.pollsOptionRepository.save(options)

        return {
            ...savedPoll,
            options
        }
    }

    async findAll(){
        return await this.pollsRepository.find({
            relations: ['options'],
            order: {
                createdAt:'DESC'
            }
        })
    }

    async findOne(id:number){
        const poll =  await this.pollsRepository.findOne({
            where:{id},
            relations: ['options','createdBy']
        })
        if(!poll){
            throw new NotFoundException("Poll does not exist")
        }
        return poll
    }

    async update(id:number,dto:UpdatePollsDto,userId:number,userRole:string){
        const poll = await this.findOne(id)
       if(poll.createdBy.id !== userId && userRole !== UserRole.ADMIN){
        throw new ForbiddenException('You are not allowed to update this poll')
       }
       const {options, ...rest} =dto
       Object.assign(poll,dto)
       return await this.pollsRepository.save(poll)
    }

    async closePoll(id:number,userId:number,userRole:string){
        const poll = await this.findOne(id)
        if(poll.createdBy.id !== userId && userRole !== UserRole.ADMIN){
            throw new ForbiddenException('You are not allowed to close this poll ')
        }
        poll.status = pollStatus.CLOSED
        return await this.pollsRepository.save(poll)
    }

    async remove(id:number,userId:number,userRole:string){
        const deletedPoll = await this.findOne(id)
        if (deletedPoll.createdBy.id !== userId && userRole !== UserRole.ADMIN) {
            throw new ForbiddenException(
            'You are not allowed to delete this poll',
            );
        }
        return await this.pollsRepository.remove(deletedPoll)
    }


    async getResults(pollId:number,state?:string){
        const query = this.pollsOptionRepository
            .createQueryBuilder('PollOption')
            .leftJoin('PollOption.votes','vote')
            .select('PollOption.optionText','optionText')
            .addSelect('COUNT(vote.id)','voteCount')

            .where('PollOption.poll = :pollId',{
                pollId
            })

             if (state) {
            query.andWhere('vote.state = :state', {
            state,
            });
        }
            query.groupBy('PollOption.id')
            return await query.getRawMany()
    }
}
