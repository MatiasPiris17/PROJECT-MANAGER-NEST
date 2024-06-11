import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UsersEntity } from '../entities/users.entity';
import { UserDTO, UserUpdateDTO } from '../dto/user.dto';

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
      return await this.userRepository.find();
    } catch (error) {
      throw new Error(error);
    }
  }

  public async findUserById(id: string) {
    try {
      return await this.userRepository
        .createQueryBuilder('user')
        .where({ id })
        .getOne()
    } catch (error) {
      throw new Error(error);
    }
  }

  public async updateUser(body: UserUpdateDTO, id: string) {
    try {
      const user: UpdateResult = await this.userRepository.update(id, body);
      if (user.affected === 0) {
        return undefined
      }
      return user
    } catch (error) {
      throw new Error(error);
    }
  }

  public async deleteUser(id: string) {
    try {
      const user: DeleteResult = await this.userRepository.delete(id);
      if (user.affected === 0) {
        return undefined
      }
      return user
    } catch (error) {
      throw new Error(error);
    }
  }
}
