import { Controller, Get, HttpCode, Param, Query } from "@nestjs/common";
import { CurrentUser } from "@/infra/auth/current-user-decorator";
import { TokenPayloadSchema } from "@/infra/auth/jwt.strategy";
import { ZodValidationPipe } from "@/infra/http/pipes/zod-validation-pipe";
import { z } from "zod";
import { FetchRecentQuestionsUseCase } from "@/domain/forum/application/use-cases/fetch-recent-questions";
import { QuestionPresenter } from "../presenters/question-presenter";
import { GetQuestionBySlugUseCase } from "@/domain/forum/application/use-cases/get-question-by-slug";

@Controller('/questions/:slug')
export class GetQuestionBySlugsController {
    constructor(private getQuestionBySlugUseCase: GetQuestionBySlugUseCase) { }

    @Get()
    @HttpCode(200)
    async handle(
        @Param('slug') slug: string,
        @CurrentUser() user: TokenPayloadSchema) {
        const result = await this.getQuestionBySlugUseCase.execute({
            slug,
        })
        if (result.isLeft()) {
            throw new Error()
        }
        return { question: QuestionPresenter.toHttp(result.value.question) }
    }
}