import { AppModule } from "./app.module";
import { NestFactory } from "@nestjs/core";
import corsConfig from "../config/cors.config";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";
import { WebsocketAdapter } from "./socket/gateway.adapter";
import { INestApplication } from "@nestjs/common/interfaces";

async function bootstrap() {
  const app = await NestFactory.create<INestApplication>(AppModule);
  app.enableCors(corsConfig);
  app.useWebSocketAdapter(new WebsocketAdapter(app));
  const options = new DocumentBuilder()
    .setTitle("Seent API")
    .setDescription("The API for Seent.")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("api", app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    })
  );

  await app.listen(process.env.PORT);
}
bootstrap();
