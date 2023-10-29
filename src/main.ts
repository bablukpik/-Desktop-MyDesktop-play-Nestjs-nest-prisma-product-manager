import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Product Data Importer')
    .setDescription('The NestJS Prisma Product Manager')
    .setVersion('1.0')
    // .addTag('products')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // App port
  const configService = app.get(ConfigService);
  const port = configService.get('APP_PORT');

  await app.listen(port || 8000);
  console.info(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
