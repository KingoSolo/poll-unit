import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { castVotesDto } from './dto/cast-votes.dto';
import { User } from 'src/common/entities/user.entity';
import { pollStatus } from 'src/common/enums/pollStatus.enums';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vote } from 'src/common/entities/vote.entity';
import { Poll } from 'src/common/entities/poll.entity';
import { PollOption } from 'src/common/entities/pollOption.entity';

@Injectable()
export class VotesService {
    constructor(
        @InjectRepository(Vote)
        private votesRepository : Repository<Vote>,

        @InjectRepository(Poll)
        private pollsRepository : Repository<Poll>,

        @InjectRepository(PollOption)
        private pollsOptionRepository : Repository<PollOption>
    ){}

    async castVotes(dto:castVotesDto,user:User){
        const poll = await this.pollsRepository.findOne({
            where:{id:dto.pollId}
        })
        if(!poll){
            throw new NotFoundException("Poll does not exist")
        }
        if(poll.status !== pollStatus.ACTIVE){
            throw new BadRequestException("Poll is closed")
        }

        const option = await this.pollsOptionRepository.findOne({
            where:{
                id:dto.OptionId,
                poll:{id:dto.pollId}
            }
        })

        if(!option){
            throw new BadRequestException('options does not belong in this poll ')
        }

        const existingVote = await this.votesRepository.findOne({
            where:{
                user:{id:user.id},
                poll:{id:dto.pollId}
            }
        })

        if(existingVote){
            throw new BadRequestException("Vote already exists")
        }
        
          const vote = this.votesRepository.create({
                user,
                poll,
                pollOption:option,
                state:user.state
            })
          const savedVote = await this.votesRepository.save(vote);
          return {
            message: 'Vote cast successfully',
            vote: {
                id: savedVote.id,
                state: savedVote.state,
                pollOption: option.optionText
            }
        }
    }

}
