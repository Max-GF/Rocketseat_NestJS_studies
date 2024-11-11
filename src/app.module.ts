import { Module } from '@nestjs/common';
import {ConfigModule} from "@nestjs/config"
import { PrismaService } from './prisma/prisma.service';
import { CreateAccountController } from './controllers/create-account.controller';

@Module({
  imports: [ConfigModule],
  controllers: [CreateAccountController],
  providers: [PrismaService],
})
export class AppModule {}
