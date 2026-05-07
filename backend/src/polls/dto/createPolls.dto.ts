import { ArrayMaxSize, ArrayMinSize, IsString } from "class-validator";

export class PollsDto{
    @IsString()
    title!:string

    @IsString()
    description!:string

    @ArrayMinSize(2)
    @ArrayMaxSize(4)
    @IsString()
    options!:string[]


}