import { BaseEntity } from "src/config/base.entity";
import { IProject } from "src/interfaces/projects.interfaces";
import { Column, Entity } from "typeorm";

@Entity({ name: 'projects' })
export class ProjectEntity extends BaseEntity implements IProject {

    @Column()
    name: string;

    @Column()
    description: string;
}