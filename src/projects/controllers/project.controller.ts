import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProjectsService } from '../services/projects.service';
import { ProjectsEntity } from '../entities/projects.entity';

@Controller('projects')
export class ProjectsController {

  constructor(private readonly projectService: ProjectsService) { }

  @Post('register')
  public async createProject(@Body() body: ProjectsEntity) {
    return await this.projectService.createProject(body);
  }

  @Get('all')
  public async findProjects() {
    return await this.projectService.findProjects();
  }

  @Get(':id')
  public async findProjectById(@Param('id') id: string) {
    return await this.projectService.findProjectById(id);
  }

  @Put('edit/:id')
  public async updateProject(@Body() body: ProjectsEntity, @Param('id') id: string) {
    return await this.projectService.updateProject(body, id);
  }

  @Delete('delete/:id')
  public async deleteProject(@Param('id') id: string) {
    return await this.projectService.deleteProject(id);
  }

}