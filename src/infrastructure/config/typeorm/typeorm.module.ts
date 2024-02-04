// import { Module } from '@nestjs/common';
// import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
// import { EnvironmentConfigService } from '../environment-config/environment-config.service';
// import { EnvironmentConfigModule } from '../environment-config/environment-config.module';

// export const getTypeOrmModuleOptions = (
//   config: EnvironmentConfigService,
// ): TypeOrmModuleOptions => {
//   return {
//     type: 'postgres',
//     host: config.getDatabaseHost(),
//     port: config.getDatabasePort(),
//     username: config.getDatabaseUser(),
//     password: config.getDatabasePassword(),
//     database: config.getDatabaseName(),
//     schema: process.env.DATABASE_SCHEMA,
//     synchronize: false,
//     entities: [__dirname + './../../**/*.entity{.ts,.js}'],
//     ssl: {
//       rejectUnauthorized: false,
//     },
//   };
// };

// @Module({
//   imports: [
//     EnvironmentConfigModule,
//     TypeOrmModule.forRootAsync({
//       imports: [EnvironmentConfigModule],
//       inject: [EnvironmentConfigService],
//       useFactory: (configService: EnvironmentConfigService) =>
//         getTypeOrmModuleOptions(configService),
//     }),
//   ],
// })
// export class TypeormModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { EnvironmentConfigService } from '../environment-config/environment-config.service';

export const getTypeOrmModuleOptions = (
  config: EnvironmentConfigService,
): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: config.getDatabaseHost(),
  port: config.getDatabasePort(),
  username: config.getDatabaseUser(),
  password: config.getDatabasePassword(),
  database: config.getDatabaseName(),
  entities: [__dirname + './../../**/*.entity{.ts,.js}'],
  synchronize: false,
  schema: process.env.DATABASE_SCHEMA,
  ssl: {
    rejectUnauthorized: false,
  },
});

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [EnvironmentConfigService],
      inject: [EnvironmentConfigService],
      useFactory: getTypeOrmModuleOptions,
    }),
  ],
})
export class TypeOrmConfigModule {}
