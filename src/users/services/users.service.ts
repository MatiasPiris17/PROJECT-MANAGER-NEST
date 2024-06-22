import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UsersEntity } from '../entities/users.entity';
import { UserDTO, UserToProjectDTO, UserUpdateDTO } from '../dto/user.dto';
import { ErrorManager } from 'src/utils/error.manager';
import { UsersProjectsEntity } from '../entities/usersProjects.entity';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(UsersEntity)
    private readonly userRepository: Repository<UsersEntity>,
    @InjectRepository(UsersProjectsEntity)
    private readonly userProjectRepository: Repository<UsersProjectsEntity>,
  ) { }

  public async createUser(body: UserDTO) {
    try {
      const newPassword = await bcrypt.hash(body.password, +process.env.HASH_SALT);
      body.password = newPassword;
      return await this.userRepository.save(body);
    } catch (err) {
      throw ErrorManager.createSignatureError(err.message);
    }
  }

  public async findUsers() {
    try {
      const users: UsersEntity[] = await this.userRepository.find();
      if (users.length === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se encontaron resultados',
        })
      }
      return users
    } catch (err) {
      throw ErrorManager.createSignatureError(err.message);
    }
  }

  public async findUserById(id: string) {
    try {
      const user: UsersEntity = await this.userRepository
        .createQueryBuilder('user')
        .where({ id })
        .leftJoinAndSelect('user.projectsIncludes', 'projectsIncludes')
        .leftJoinAndSelect('projectsIncludes.project', 'project')
        .getOne()
      if (!user) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se encontaron resultados',
        })
      }
      return user
    } catch (err) {
      throw ErrorManager.createSignatureError(err.message);
    }
  }

  public async updateUser(body: UserUpdateDTO, id: string) {
    try {
      const user: UpdateResult = await this.userRepository.update(id, body);
      if (user.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se pudo actualizar',
        })
      }
      return user
    } catch (err) {
      throw ErrorManager.createSignatureError(err.message);
    }
  }

  public async deleteUser(id: string) {
    try {
      const user: DeleteResult = await this.userRepository.delete(id);
      if (user.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se pudo eliminar',
        })
      }
      return user
    } catch (err) {
      throw ErrorManager.createSignatureError(err.message);
    }
  }

  public async relationToProject(body: UserToProjectDTO) {
    try {
      return await this.userProjectRepository.save(body);
    } catch (err) {
      throw ErrorManager.createSignatureError(err.message);
    }
  }
  
  public async findBy({key,value}:{ key:keyof UserDTO, value:any }) {
    try {
      const user:UsersEntity = await this.userRepository.createQueryBuilder('user')
        .addSelect('user.password')
        .where({ [key]: value })
        .getOne()

        return user
    } catch (err) {
      throw ErrorManager.createSignatureError(err.message);
    }
  }
}
