import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProjectsEntity } from "../entities/projects.entity";
import { DeleteResult, Repository, UpdateResult } from "typeorm";


@Injectable()
export class ProjectsService {

    constructor(
        @InjectRepository(ProjectsEntity)
        private readonly projectRepository: Repository<ProjectsEntity>
      ) { }

    getHello(): object {
        return { "message": 'Hello World! Projects module' };
    }

    public async createProject(body: ProjectsEntity) {
        try {
          return await this.projectRepository.save(body);
        } catch (error) {
          throw new Error(error);
        }
    }

    public async findProjects() {
        try {
          return await this.projectRepository.find();
        } catch (error) {
          throw new Error(error);
        }
    }

    public async findProjectById(id: string) {
        try {
          return await this.projectRepository
            .createQueryBuilder('project')
            .where({ id })
            .getOne()
        } catch (error) {
          throw new Error(error);
        }
    }

    public async updateProject(body: ProjectsEntity, id: string) {
        try {
          const project: UpdateResult = await this.projectRepository.update(id, body);
          if (project.affected === 0) {
            return undefined
          }
          return project
        } catch (error) {
          throw new Error(error);
        }
    }

    public async deleteProject(id: string) {
        try {
          const project: DeleteResult = await this.projectRepository.delete(id);
          if (project.affected === 0) {
            return undefined
          }
          return project
        } catch (error) {
          throw new Error(error);
        }
    }
    
}