import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { pollStatus } from "../enums/pollStatus.enums";
import { User } from "./user.entity";
import { pollOption } from "./pollOption.entity";
import { Vote } from "./vote.entity";

@Entity()
export class Poll{
    @PrimaryGeneratedColumn('uuid')
    id!:string

    @Column()
    title!:string

    @Column()
    description!:string

    @Column({type: 'enum', enum: pollStatus,default:pollStatus.ACTIVE})
    status!:pollStatus

    @CreateDateColumn()
    createdAt!:Date

    @UpdateDateColumn()
    updatedAt!:Date

    @OneToMany(()=>pollOption,(pollOption)=>pollOption.poll,{eager:false})
    pollOptions!:pollOption


    @ManyToOne(()=> User,(user) => user.polls,{eager:false})
    createdBy!:User

    @ManyToOne(()=> Vote,(vote) => vote.poll,{eager:false})
    vote!:Vote

}