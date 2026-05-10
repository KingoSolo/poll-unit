import { Module } from '@nestjs/common';
import { PollsService } from './polls.service';
import { PollsController } from './polls.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Poll } from '../common/entities/poll.entity';
import { PollOption } from '../common/entities/pollOption.entity';

@Module({
  providers: [PollsService],
  imports: [TypeOrmModule.forFeature([Poll]),TypeOrmModule.forFeature([PollOption])],
  controllers: [PollsController]
  
})
export class PollsModule {}
