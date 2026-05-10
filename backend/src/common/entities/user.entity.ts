import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserRole } from "../enums/userRole.enums";
import { Vote } from "./vote.entity";
import { Poll } from "./poll.entity";

@Entity()
export class User {
@PrimaryGeneratedColumn()
id!:number

@Column()
firstName!:string

@Column()
lastName!:string

@Column()
state!:string

@Column({unique:true})
email!:string

@Column()
password!:string

@Column({
    type:'enum',
    enum:UserRole,
    default:UserRole.USER
})
role!:UserRole

@OneToMany(() => Vote,(vote) => vote.user,{eager:false})
votes!:Vote[]

@OneToMany(() => Poll,(poll)=> poll.createdBy,{eager:false})
polls!:Poll[]
}