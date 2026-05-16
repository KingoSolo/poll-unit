import { Body, Controller, Get, IsString, Patch, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { UsersService } from './users.service';
import { User } from 'src/common/entities/user.entity';
import { IsNotEmpty, MinLength } from 'class-validator';

class UpdatePasswordDto {
    @IsNotEmpty()
    currentPassword!: string;

    @IsNotEmpty()
    @MinLength(6)
    newPassword!: string;
}

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get('me')
    getMe(@CurrentUser() user: User) {
        return this.usersService.getMe(user.id);
    }

    @Patch('me/password')
    updatePassword(@CurrentUser() user: User, @Body() dto: UpdatePasswordDto) {
        return this.usersService.updatePassword(user.id, dto.currentPassword, dto.newPassword);
    }
}
