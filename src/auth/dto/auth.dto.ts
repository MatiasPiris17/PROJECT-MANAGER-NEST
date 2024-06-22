import { IsNotEmpty, IsString } from "class-validator";


export class AuthDTO implements AuthDTO {
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}