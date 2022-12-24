import { Module, ValidationPipe } from '@nestjs/common';
import * as Joi from '@hapi/joi';
import { ConfigModule } from '@nestjs/config';
import PostsModule from './modules/post/posts.module';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { MongooseErrorFilter } from './filters/mongo-exception.filter';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        MONGO_USERNAME: Joi.string().required(),
        MONGO_PASSWORD: Joi.string().required(),
        MONGO_DATABASE: Joi.string().required(),
        // MONGO_PATH: Joi.string().required(),
      }),
    }),
    DatabaseModule,
    PostsModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: MongooseErrorFilter,
    },
    {
      provide: APP_PIPE,
      useFactory: () => new ValidationPipe({ transform: true }),
    },
  ],
})
export class AppModule {}
