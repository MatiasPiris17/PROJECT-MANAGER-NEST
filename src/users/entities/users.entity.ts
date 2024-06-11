import { BaseEntity } from "src/config/base.entity";
import { IUser } from "src/interfaces/user.interfaces";
import { Column, Entity } from "typeorm";

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity implements IUser {

    @Column()
    firsName: string;

    @Column()
    lastName: string;

    @Column()
    age: number;

    @Column()
    email: string;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    role: string;
}