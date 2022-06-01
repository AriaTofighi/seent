import { AppModule } from "./app.module";
import { NestFactory } from "@nestjs/core";
import corsConfig from "../config/cors.config";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(corsConfig);

  const options = new DocumentBuilder()
    .setTitle("Seent API")
    .setDescription("The API for Seent.")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("api", app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    })
  );

  await app.listen(3000);
}
bootstrap();
