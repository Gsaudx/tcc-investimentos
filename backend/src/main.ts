import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  // 1. Configuração de CORS (Segurança)
  // Em produção, substitua '*' pela URL do CloudFront
  app.enableCors({
    origin: process.env.CORS_ORIGIN || '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // 2. Validação Global (Pipes)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove propriedades não decoradas no DTO
      forbidNonWhitelisted: true, // Erro se enviar propriedade extra
      transform: true, // Transforma payload no tipo do DTO
    }),
  );

  // 3. Swagger (Documentação Viva) - Apenas em Desenvolvimento
  if (process.env.NODE_ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('TCC Investimentos API')
      .setDescription(
        'API para gestão de carteiras e otimização (Knapsack Problem)',
      )
      .setVersion('1.0')
      .addTag('optimization', 'Módulo de Otimização de Carteira')
      .addTag('assets', 'Gestão de Ativos e Derivativos')
      .addTag('wallet', 'Carteira do Cliente')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
  }

  const port = process.env.PORT ?? 3000;
  await app.listen(port, '0.0.0.0');

  logger.log(`🚀 Application is running on: http://localhost:${port}`);
  if (process.env.NODE_ENV !== 'production') {
    logger.log(`📑 Swagger Documentation: http://localhost:${port}/api`);
  }
}

bootstrap().catch((err) => {
  new Logger('Bootstrap').error('Error starting application', err);
});
