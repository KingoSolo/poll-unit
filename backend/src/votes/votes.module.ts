import { Module } from '@nestjs/common';
import { VotesService } from './votes.service';
import { VotesController } from './votes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vote } from 'src/common/entities/vote.entity';
import { PollOption } from 'src/common/entities/pollOption.entity';
import { Poll } from 'src/common/entities/poll.entity';

@Module({
  providers: [VotesService],
  imports:[TypeOrmModule.forFeature([Vote]), TypeOrmModule.forFeature([PollOption]),TypeOrmModule.forFeature([Poll])],
  controllers: [VotesController]
})
export class VotesModule {}
