import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Poll } from "./poll.entity";
import { Vote } from "./vote.entity";

@Entity()
export class pollOption{
    @PrimaryGeneratedColumn('uuid')
    id!:number

    @Column()
    optionText!:string

    @ManyToOne(()=>Poll,(poll)=>poll.pollOptions,{eager:false})
    poll!:Poll

    @OneToMany(()=>Vote,(vote)=>vote.pollOptions,{eager:false})
    votes!:Vote[]
}