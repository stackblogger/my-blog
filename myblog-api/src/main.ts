import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import getServerConfig from './config/configurations/server.config';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  await app.listen(getServerConfig().port, getServerConfig().host);
  console.log(`Server is listening at port ${getServerConfig().port} and host ${getServerConfig().host}`);
}
bootstrap();
