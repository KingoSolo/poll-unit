import { PartialType } from "@nestjs/mapped-types";
import { CreatePollsDto } from "./createPolls.dto";

export class UpdatePollsDto extends PartialType(CreatePollsDto){}