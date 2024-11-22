import { Body, Controller, HttpCode, Post, UnauthorizedException, UsePipes } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { compare } from "bcryptjs";
import { ZodValidationPipe } from "@/infra/http/pipes/zod-validation-pipe";
import { PrismaService } from "@/infra/database/prisma/prisma.service";
import { z } from "zod"

const authentificateBodySchema = z.object({
    email: z.string().email(),
    password: z.string(),
})

type AuthentificateBodySchema = z.infer<typeof authentificateBodySchema>

@Controller('/authenticate')
export class AuthentificateController {
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService) { }

    @Post()
    @HttpCode(200)
    @UsePipes(new ZodValidationPipe(authentificateBodySchema))
    async handle(@Body() body: AuthentificateBodySchema) {
        const { email, password } = body
        const user = await this.prisma.user.findUnique({
            where: {
                email,
            }
        })
        if (!user) {
            throw new UnauthorizedException('User credentials do not match')
        }
        const isPasswordValid = await compare(password, user.password)
        if (!isPasswordValid) {
            throw new UnauthorizedException('User credentials do not match')

        }
        
        const accessToken = this.jwt.sign({ sub: user.id })
        return { access_token: accessToken }
    }

}