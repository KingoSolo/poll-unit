import {IsEmail, IsNotEmpty, IsString, Min, MinLength} from 'class-validator'
export class SignUpDto{
    @IsString()
    firstName!:string
    
    @IsString()
    lastName!:string

    @IsEmail()
    @IsNotEmpty()
    email!:string

    @MinLength(6)
    password!:string

    @IsString()
    @IsNotEmpty()
    state!:string
}