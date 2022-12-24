import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const port = 3088;
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('江囤后台API文档')
    .setDescription('')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  await app.listen(port);

  console.log('[app is running on]:', port);
}
bootstrap();
