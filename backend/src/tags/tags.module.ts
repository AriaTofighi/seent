import { Module } from "@nestjs/common";
import { PrismaService } from "src/orm/prisma.service";
import { TagssController } from "./tags.controller";
import { TagsService } from "./tags.service";

@Module({
  controllers: [TagssController],
  providers: [TagsService, PrismaService],
  exports: [TagsService],
})
export class TagsModule {}
