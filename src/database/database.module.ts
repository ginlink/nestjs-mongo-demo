import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import * as schemas from '@/schemas';
import mongoose from 'mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';

mongoose.plugin(uniqueValidator, {
  message: '错误！{PATH}:{VALUE} 已经存在！',
});
export const features = [];

Object.keys(schemas).forEach((v) => {
  const schema = schemas[v];
  if (schema['SCHEMA']) {
    features.push({ name: schema.name, schema: schema.SCHEMA });
  }
});

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        mongoose.set('debug', configService.get<boolean>('DEBUG') || false);

        const username = configService.get('MONGO_USERNAME');
        const password = configService.get('MONGO_PASSWORD');
        const database = configService.get('MONGO_DATABASE');
        const host = configService.get('MONGO_HOST');

        return {
          uri: `mongodb://${username}:${password}@${host}`,
          dbName: database,
        };
      },
      inject: [ConfigService],
    }),
    MongooseModule.forFeature(features),
  ],
  exports: [MongooseModule.forFeature(features)],
})
export class DatabaseModule {}
