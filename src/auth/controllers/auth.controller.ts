import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthDTO } from '../dto/auth.dto';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    @Post('login')
    async login(@Body() username: AuthDTO) {
        const userValidate = await this.authService.validateUser(username.username, username.password);

        if (!userValidate) {
            throw new UnauthorizedException('Data not valid');
        }
        
        const jwt = await this.authService.generateJWT(userValidate);

        return jwt
    }
}
