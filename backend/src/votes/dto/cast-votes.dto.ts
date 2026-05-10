import { IsNotEmpty } from "class-validator";

export class castVotesDto{
    @IsNotEmpty()
    pollId!:number

    @IsNotEmpty()
    OptionId!:number
}