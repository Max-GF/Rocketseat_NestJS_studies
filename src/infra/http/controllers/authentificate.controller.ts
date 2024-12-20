import { BadRequestException, Body, Controller, HttpCode, Post, UnauthorizedException, UsePipes } from "@nestjs/common";
import { ZodValidationPipe } from "@/infra/http/pipes/zod-validation-pipe";
import { z } from "zod";
import { AuthenticateStudentUseCase } from "@/domain/forum/application/use-cases/authenticate-student";
import { StudentWrongCredentialsError } from "@/domain/forum/errors/wrong-credentials-error";
import { Public } from "@/infra/auth/public";

const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string(),
})

type AuthenticateBodySchema = z.infer<typeof authenticateBodySchema>

@Controller('/authenticate')
@Public()
export class AuthenticateController {
    constructor(
        private authenticateStudent: AuthenticateStudentUseCase,
    ) { }

    @Post()
    @HttpCode(200)
    @UsePipes(new ZodValidationPipe(authenticateBodySchema))
    async handle(@Body() body: AuthenticateBodySchema) {
        const { email, password } = body

        const result = await this.authenticateStudent.execute({
            email,
            password,
        })
        if (result.isLeft()) {
            const error = result.value
            switch (error.constructor) {
                case StudentWrongCredentialsError:
                    throw new UnauthorizedException(error.message)
                default:
                    throw new BadRequestException(error.message)
            }
        }

        const { accessToken } = result.value
        return { access_token: accessToken }
    }

}