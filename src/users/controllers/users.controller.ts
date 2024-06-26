import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { UserDTO, UserToProjectDTO, UserUpdateDTO } from '../dto/user.dto';

@Controller('users')
export class UsersController {
    
    constructor(private readonly userService: UsersService) {}

    @Post('register')
    public async registerUser(@Body() body:UserDTO){
      return await this.userService.createUser(body);
    }

    @Get('all')
    public async findAllUsers(){
      return await this.userService.findUsers();
    }

    @Get(':id')
    public async findUserById(@Param('id', new ParseUUIDPipe()) id:string){
      return await this.userService.findUserById(id);
    }
     
    @Put('edit/:id')
    public async updateUser(@Param('id', new ParseUUIDPipe()) id:string, @Body() body:UserUpdateDTO){
      return await this.userService.updateUser(body, id);
    }

    @Delete('delete/:id')
    public async deleteUser(@Param('id', new ParseUUIDPipe()) id:string){
      return await this.userService.deleteUser(id);
    }

    @Post('add-to-project')
    public async addToProject(@Body() body: UserToProjectDTO){
      return await this.userService.relationToProject(body);
    }
}