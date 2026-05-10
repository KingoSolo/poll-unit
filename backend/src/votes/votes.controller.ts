import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { VotesService } from './votes.service';
import { castVotesDto } from './dto/cast-votes.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('votes')
export class VotesController {
    constructor(
        private votesService:VotesService
    ){}

    @Post()
    cast_vote(@Body() castVotesdto:castVotesDto,@CurrentUser() user:any){
      return  this.votesService.castVotes(castVotesdto,user)
    }
}
