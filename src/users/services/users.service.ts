import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    getHello(): object {
        return {"message": 'Hello World! Users module'};
      }
}
