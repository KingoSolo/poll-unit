import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { PollsService } from './polls.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { CreatePollsDto } from './dto/createPolls.dto';
import { Roles } from 'src/auth/decorators/roles.decorators';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { UserRole } from 'src/common/enums/userRole.enums';
import { UpdatePollsDto } from './dto/updatePolls.dto';

@UseGuards(JwtAuthGuard)
@Controller('polls')
export class PollsController {
    constructor(
        private pollsService : PollsService
    ){}

    @Post()
    @UseGuards(RolesGuard)
    @Roles(UserRole.ADMIN)
    create(@Body() createPollsDto:CreatePollsDto, @CurrentUser() user:any){
        return this.pollsService.create(createPollsDto,user.id)
    }

    @Get()
    getPolls(){
        return this.pollsService.findAll()
    }

    @Get(':id')
    getOnePoll(@Param('id',ParseIntPipe) id:number){
        return this.pollsService.findOne(id)
    }

    @Patch(':id')
    @UseGuards(RolesGuard)
    updatePoll(@Body() updatePollsDto:UpdatePollsDto, @Param('id',ParseIntPipe) id:number, @CurrentUser() user:any
    ){
      return this.pollsService.update(id,updatePollsDto,user.userId,user.role)
    }

    @Patch(':id/close')
    @UseGuards(RolesGuard)
    closePoll(@Param('id',ParseIntPipe) id:number, @CurrentUser() user:any ){
        return this.pollsService.closePoll(id,user.userId,user.role)
    }

    @Delete(':id')
    @UseGuards(RolesGuard)
    deletePoll(@Param('id',ParseIntPipe) id:number, @CurrentUser() user:any){
        return this.pollsService.remove(id,user.userId,user.role)
    }

    @Get(':id/results')
    getResults(
        @Param('id', ParseIntPipe) id:number,
        @Query('state') state?:string
    ){
        return this.pollsService.getResults(id,state)
    }

}
