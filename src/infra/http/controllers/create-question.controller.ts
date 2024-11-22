import { Body, Controller, HttpCode, Post, UseGuards} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { CurrentUser } from "@/infra/auth/current-user-decorator";
import { TokenPayloadSchema } from "@/infra/auth/jwt.strategy";
import { ZodValidationPipe } from "@/infra/http/pipes/zod-validation-pipe";
import { PrismaService } from "@/infra/database/prisma/prisma.service";
import { z } from "zod"
import { CreateQuestionUseCase } from "@/domain/forum/application/use-cases/create-question";

const createQuestionBodySchema = z.object({
    title: z.string(),
    content: z.string(),
})

type CreateQuestionBodySchema = z.infer<typeof createQuestionBodySchema>
const createQuestionsBodyValidationPipe = new ZodValidationPipe(createQuestionBodySchema)

@Controller('/questions')
@UseGuards(AuthGuard('jwt'))
export class CreateQuestionController {
    constructor(private createQuestion : CreateQuestionUseCase) { }
    // constructor(private prisma: PrismaService) { }

    @Post()
    @HttpCode(201)
    async handle(@Body(createQuestionsBodyValidationPipe) body: CreateQuestionBodySchema,
        @CurrentUser() user: TokenPayloadSchema) {
        const { title, content } = body
        const userId = user.sub
        await this.createQuestion.execute({
            title,
            content,
            authorId: userId,
            attachmentsIds: [],
        })
        return "ok"
    }
}