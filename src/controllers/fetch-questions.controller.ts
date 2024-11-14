import { Body, Controller, Get, HttpCode, Post, Query, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { CurrentUser } from "src/auth/current-user-decorator";
import { TokenPayloadSchema } from "src/auth/jwt.strategy";
import { ZodValidationPipe } from "src/pipes/zod-validation-pipe";
import { PrismaService } from "src/prisma/prisma.service";
import { z } from "zod";

const pageQueryParamsSchema = z
    .coerce.number()
    .optional()
    .default(1)


const queryValidationPipe = new ZodValidationPipe(pageQueryParamsSchema)
type PageQueryParamsSchema = z.infer<typeof pageQueryParamsSchema>

@Controller('/questions')
@UseGuards(AuthGuard('jwt'))
export class FetchQuestionsController {
    constructor(private prisma: PrismaService) { }

    @Get()
    @HttpCode(200)
    async handle(
        @Query('page', queryValidationPipe) page: PageQueryParamsSchema,
        @CurrentUser() user: TokenPayloadSchema) {
        const perPage = 1
        const questions = await this.prisma.question.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            take: perPage,
            skip: (page - 1) * perPage
        })
        return { questions }
    }
}