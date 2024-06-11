import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProjectsEntity } from "../entities/projects.entity";
import { Repository } from "typeorm";


@Injectable()
export class ProjectsService {

    constructor(
        @InjectRepository(ProjectsEntity)
        private readonly projectRepository: Repository<ProjectsEntity>
      ) { }

    getHello(): object {
        return { "message": 'Hello World! Projects module' };
    }

}