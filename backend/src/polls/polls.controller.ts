import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { PollsService } from './polls.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { CreatePollsDto } from './dto/createPolls.dto';
import { Roles } from 'src/auth/decorators/roles.decorators';

@UseGuards(JwtAuthGuard,RolesGuard)
@Controller('polls')
export class PollsController {
    constructor(
        private pollsService : PollsService
    ){}

    @Post()
    @Roles('admin')
    @HttpCode(HttpStatus.OK)
    create(@Body() createPollsDto:CreatePollsDto, userId:number){
        return this.pollsService.create(createPollsDto,userId)
    }


}
