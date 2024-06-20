import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UsersEntity } from '../entities/users.entity';
import { UserDTO, UserUpdateDTO } from '../dto/user.dto';
import { ErrorManager } from 'src/utils/error.manager';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(UsersEntity)
    private readonly userRepository: Repository<UsersEntity>
  ) { }

  getHello(): object {
    return { "message": 'Hello World! Users module' };
  }

  public async createUser(body: UserDTO) {
    try {
      return await this.userRepository.save(body);
    } catch (error) {
      throw new Error(error);
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
}
