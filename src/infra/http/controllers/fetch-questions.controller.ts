import { Body, Controller, Get, HttpCode, Post, Query, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { CurrentUser } from "@/infra/auth/current-user-decorator";
import { TokenPayloadSchema } from "@/infra/auth/jwt.strategy";
import { ZodValidationPipe } from "@/infra/http/pipes/zod-validation-pipe";
import { PrismaService } from "@/infra/database/prisma/prisma.service";
import { z } from "zod";
import { FetchRecentQuestionsUseCase } from "@/domain/forum/application/use-cases/fetch-recent-questions";
import { QuestionPresenter } from "../presenters/question-presenter";

const pageQueryParamsSchema = z
    .coerce.number()
    .optional()
    .default(1)


const queryValidationPipe = new ZodValidationPipe(pageQueryParamsSchema)
type PageQueryParamsSchema = z.infer<typeof pageQueryParamsSchema>

@Controller('/questions')
@UseGuards(AuthGuard('jwt'))
export class FetchQuestionsController {
    constructor(private fetchRecentQuestionsUseCase: FetchRecentQuestionsUseCase) { }

    @Get()
    @HttpCode(200)
    async handle(
        @Query('page', queryValidationPipe) page: PageQueryParamsSchema,
        @CurrentUser() user: TokenPayloadSchema) {
        const result = await this.fetchRecentQuestionsUseCase.execute({
            page,

        })
        if (result.isLeft()){
            throw new Error()
        }
            return { questions:  result.value.questions.map(QuestionPresenter.toHttp)}
    }
}