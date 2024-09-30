import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { EntityValidationErrorFilter } from './shared/exeption-filter/entity-validation-error.filter';
import { ConflictFilter } from './shared/exeption-filter/conflict-error.filter';
import { NotFoundErrorFilter } from './shared/exeption-filter/not-found-error.filter';
import { BadRequestErrorFilter } from './shared/exeption-filter/bad-request-error.filter';
import { UnauthorizedFilter } from './shared/exeption-filter/unauthorize-error.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.useGlobalFilters(
    new EntityValidationErrorFilter(),
    new ConflictFilter(),
    new NotFoundErrorFilter(),
    new BadRequestErrorFilter(),
    new UnauthorizedFilter()
  );

  await app.listen(3000);
}

bootstrap();
