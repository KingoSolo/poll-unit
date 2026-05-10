import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Poll } from "./poll.entity";
import { Vote } from "./vote.entity";

@Entity()
export class PollOption{
    @PrimaryGeneratedColumn()
    id!:number

    @Column()
    optionText!:string

    @ManyToOne(()=>Poll,(poll)=>poll.options,{eager:false})
    poll!:Poll

    @OneToMany(()=>Vote,(vote)=>vote.pollOption,{eager:false})
    votes!:Vote[]
}