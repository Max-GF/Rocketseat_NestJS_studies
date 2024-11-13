import { Body, Controller, Get, HttpCode, Post, UseGuards, UsePipes } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { CurrentUser } from "src/auth/current-user-decorator";
import { TokenPayloadSchema } from "src/auth/jwt.strategy";
import { ZodValidationPipe } from "src/pipes/zod-validation-pipe";
import { PrismaService } from "src/prisma/prisma.service";
import { z } from "zod"

const createQuestionBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
})

type CreateQuestionBodySchema = z.infer<typeof createQuestionBodySchema>

@Controller('/questions')
@UseGuards(AuthGuard('jwt'))
export class CreateQuestionController {
    constructor(private prisma: PrismaService) { }

    @Get()
    @HttpCode(200)
    // @UsePipes(new ZodValidationPipe(createQuestionBodySchema))
    async handle(@CurrentUser() user : TokenPayloadSchema) {
        console.log(user.sub)
        return "ok"
    }
}