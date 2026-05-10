import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { User } from "./user.entity";
import { PollOption } from "./pollOption.entity";
import { Poll } from "./poll.entity";

@Entity()
@Unique(['user','poll'])
export class Vote {
    @PrimaryGeneratedColumn()
    id!:number

    @Column()
    state!:string

     @CreateDateColumn()
    createdAt!: Date;


    @ManyToOne(() => User,(user) => user.votes,{eager:false})
    user!: User

    @ManyToOne(() =>PollOption,(pollOption)=>pollOption.votes,{eager:false})
    pollOption!:PollOption

    @ManyToOne(() => Poll, (poll) => poll.vote, { eager: false })
    poll!: Poll
}