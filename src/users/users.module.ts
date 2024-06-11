import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from './entities/users.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersEntity]), // se injecta en los servicio
  ],
  providers: [UsersService], // se injecta en los controladores
  controllers: [UsersController] // capa externa 
})
export class UsersModule {}
