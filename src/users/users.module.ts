import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from './entities/users.entity';
import { UsersProjectsEntity } from './entities/usersProjects.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersEntity, UsersProjectsEntity]), // se injecta en los servicio
  ],
  providers: [UsersService], // se injecta en los controladores
  controllers: [UsersController] // capa externa 
})
export class UsersModule {}
