import { ArrayMaxSize, ArrayMinSize, IsString } from "class-validator";

export class CreatePollsDto{
    @IsString()
    title!:string

    @IsString()
    description!:string

    @ArrayMinSize(2)
    @ArrayMaxSize(4)
    @IsString({each:true})
    options!:string[]


}