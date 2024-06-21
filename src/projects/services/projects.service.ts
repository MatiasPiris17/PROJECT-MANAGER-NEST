import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProjectsEntity } from "../entities/projects.entity";
import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { ErrorManager } from "src/utils/error.manager";


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
    } catch (err) {
      throw new Error(err);
    }
  }

  public async findProjects() {
    try {
      const projects: ProjectsEntity[] = await this.projectRepository.find();
      if (projects.length === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se encontaron resultados',
        })
      }

      return projects
    } catch (err) {
      throw ErrorManager.createSignatureError(err.message);
    }
  }

  public async findProjectById(id: string) {
    try {
      const project: ProjectsEntity = await this.projectRepository
        .createQueryBuilder('project')
        .where({ id })
        .getOne()

      if (!project) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se encontaron resultados',
        })
      }

      return project
    } catch (err) {
      throw ErrorManager.createSignatureError(err.message);
    }
  }

  public async updateProject(body: ProjectsEntity, id: string) {
    try {
      const project: UpdateResult = await this.projectRepository.update(id, body);
      if (project.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se pudo actualizar',
        })
      }
      return project
    } catch (err) {
      throw ErrorManager.createSignatureError(err.message);
    }
  }

  public async deleteProject(id: string) {
    try {
      const project: DeleteResult = await this.projectRepository.delete(id);
      if (project.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se pudo eliminar',
        })
      }
      return project
    } catch (err) {
      throw ErrorManager.createSignatureError(err.message);
    }
  }

}