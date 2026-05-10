import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { SignUpDto } from './dto/signup.dto';
import * as bcrypt from 'bcrypt'
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
    constructor(
        private readonly userService : UsersService,
        private readonly jwtService : JwtService
    ){}

    async signup(dto:SignUpDto){
        const existingUser =await this.userService.findByEmail(dto.email)
        if(existingUser){
            throw new ConflictException('email already in use')
        }
        const hashedPassword = await bcrypt.hash(dto.password,10)
      

        const user = await this.userService.create({
            ...dto,
            password:hashedPassword
        })
        const {password,...userWithoutPassword} = user
        return userWithoutPassword
    }

    async login(dto:LoginDto){
        const user = await this.userService.findByEmail(dto.email)
        if(!user){
            throw new UnauthorizedException('Invalid Credentials')
        }
        const isMatch = await bcrypt.compare(dto.password,user.password)
        if(!isMatch){
            throw new UnauthorizedException('Invalid credentials')
        }

        const payload = {
            sub:user.id,
            email:user.email,
            role:user.role,
            state:user.state
        }

        const token = await this.jwtService.signAsync(payload)

        return {
            access_token: token
        }
    }
}
