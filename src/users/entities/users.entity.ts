import { BaseEntity } from "../../config/base.entity";
import { ROLES } from "../../constants";
import { IUser } from "../../interfaces/user.interfaces";
import { Column, Entity, OneToMany } from "typeorm";
import { UsersProjectsEntity } from "./usersProjects.entity";

@Entity({ name: 'users' })
export class UsersEntity extends BaseEntity implements IUser {

    @Column()
    firsName: string;

    @Column()
    lastName: string;

    @Column()
    age: number;

    @Column({ unique: true })
    email: string;

    @Column({ unique: true })
    username: string;

    @Column()
    password: string;

    @Column({type: 'enum', enum: ROLES, default: ROLES.BASIC})
    role: ROLES;

    @OneToMany(() => UsersProjectsEntity, (usersProjects) => usersProjects.user)
    projectsIncludes: UsersProjectsEntity[]
}