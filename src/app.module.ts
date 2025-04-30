import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { AuthModule } from "./auth/auth.module";

import { join } from "path";
import { UsersModule } from "./users/users.module";
import { DepartmentsModule } from './departments/departments.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
          return {
              type: "postgres",
              host: configService.get<string>('DB_HOST'),
              port: parseInt(String(configService.get<string>('DB_PORT')), 5432),
              username: configService.get<string>('DB_USERNAME'),
              password: configService.get<string>('DB_PASSWORD'),
              database: configService.get<string>('DB_DATABASE'),
              synchronize: true,
              entities: [__dirname + '/**/*.entity{.ts,.js}'],
              migrations: [__dirname + '/migrations/*{.ts,.js}'],
          };
      },
      inject: [ConfigService]
  }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), "src/schema.gql"),
      sortSchema: true,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()]
    }),
    AuthModule,
    UsersModule,
    DepartmentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
