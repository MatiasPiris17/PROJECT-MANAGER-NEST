// CONFIGURACION CON TYPEORM Y CONEXION A UNA BASES DE DATOS    

import { ConfigModule, ConfigService } from "@nestjs/config";
import { DataSource, DataSourceOptions } from "typeorm";
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

ConfigModule.forRoot({ // TODO: Revisar problema con el ambiente de desarrollo
    envFilePath: `.env`,
})

/**
 * "m:gen": "set NODE_ENV=development && npm run orm:init migration:generate",
 * "m:run": "set NODE_ENV=development && npm run orm:init migration:run"
 * comando para correr migrations: npm run m:gen -- ./migrations/init
 */

const configService = new ConfigService()

export const dataSourceConfig: DataSourceOptions = {
    type: 'postgres',
    host: configService.get('DB_HOST'),
    port: configService.get('DB_PORT'),
    username: configService.get('DB_USER'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_NAME'),
    entities: [__dirname + '/../**/**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/../../migrations/*{.ts,.js}'],
    synchronize: false,
    migrationsRun: true,
    logging: false,
    namingStrategy: new SnakeNamingStrategy(),
}

export const appDS = new DataSource(dataSourceConfig)