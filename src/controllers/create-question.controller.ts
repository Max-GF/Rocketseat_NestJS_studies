import { Body, Controller, HttpCode, Post, UseGuards} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { CurrentUser } from "src/auth/current-user-decorator";
import { TokenPayloadSchema } from "src/auth/jwt.strategy";
import { ZodValidationPipe } from "src/pipes/zod-validation-pipe";
import { PrismaService } from "src/prisma/prisma.service";
import { z } from "zod"

const createQuestionBodySchema = z.object({
    title: z.string(),
    content: z.string(),
})

type CreateQuestionBodySchema = z.infer<typeof createQuestionBodySchema>
const createQuestionsBodyValidationPipe = new ZodValidationPipe(createQuestionBodySchema)

@Controller('/questions')
@UseGuards(AuthGuard('jwt'))
export class CreateQuestionController {
    constructor(private prisma: PrismaService) { }

    @Post()
    @HttpCode(201)
    async handle(@Body(createQuestionsBodyValidationPipe) body: CreateQuestionBodySchema,
        @CurrentUser() user: TokenPayloadSchema) {
        const { title, content } = body
        const userId = user.sub
        await this.prisma.question.create({
            data : {
                title,
                content,
                slug : title.toLowerCase(),
                authorId : userId,
            },
        })
        return "ok"
    }
}