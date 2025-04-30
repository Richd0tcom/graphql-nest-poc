import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => {
                return {
                    type: "postgres",
                    host: configService.get<string>('DB_HOST'),
                    port: parseInt(String(configService.get<string>('DB_PORT')), 10),
                    username: configService.get<string>('DB_USERNAME'),
                    password: configService.get<string>('DB_PASSWORD'),
                    database: configService.get<string>('DB_DATABASE'),
                    synchronize: configService.get<string>('DB_SYNCH') === 'true',
                    entities: [__dirname + '/**/*.entity{.ts,.js}'],
                    migrations: [__dirname + '/migrations/*{.ts,.js}'],
                };
            },
            inject: [ConfigService]
        })
    ],
    providers:[],
    exports: []
})
export class DbModule {}
