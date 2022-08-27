import { Module } from "@nestjs/common";
import { ReactionsService } from "./reactions.service";
import { ReactionsController } from "./reactions.controller";
import { PrismaService } from "src/prisma.service";
@Module({
  controllers: [ReactionsController],
  providers: [ReactionsService, PrismaService],
  exports: [ReactionsService],
})
export class ReactionsModule {}
