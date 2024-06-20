import { HttpException, HttpStatus } from "@nestjs/common";

export class ErrorManager extends Error {
    constructor({ type, message }: { type: keyof typeof HttpStatus, message: string }) {
        super(`${type} - ${message}`);
    }

    public static createSignatureError(message: string) {
        
        const errorType = message.split(' - ')[0];
        const errorMessage = message.split(' - ')[1];
        const statusCode = HttpStatus[errorType] || HttpStatus.INTERNAL_SERVER_ERROR;

        throw new HttpException(errorMessage, statusCode);
    }
}