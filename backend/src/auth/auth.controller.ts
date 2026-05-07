import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService : AuthService
    ){}

    @Post('signup')
    @HttpCode(HttpStatus.OK)
    async create(@Body() signUpDto:SignUpDto){
        return this.authService.signup(signUpDto)
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Body() loginDto:LoginDto){
        return this.authService.login(loginDto)
    }
}
