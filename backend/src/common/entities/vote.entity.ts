import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { User } from "./user.entity";
import { pollOption } from "./pollOption.entity";
import { Poll } from "./poll.entity";

@Entity()
@Unique(['user','poll'])
export class Vote {
    @PrimaryGeneratedColumn('uuid')
    id!:string

    @Column()
    state!:string

     @CreateDateColumn()
    createdAt!: Date;


    @ManyToOne(() => User,(user) => user.votes,{eager:false})
    user!: User

    @ManyToOne(() =>pollOption,(pollOption)=>pollOption.votes,{eager:false})
    pollOptions!:pollOption

    @ManyToOne(() => Poll, (poll) => poll.vote, { eager: false })
    poll!: Poll
}