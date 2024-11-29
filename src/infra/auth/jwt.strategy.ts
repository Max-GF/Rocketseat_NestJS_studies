import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { z } from "zod";
import { EnvService } from "../env/env.service";

const tokenPayloadSchema = z.object({
    sub: z.string().uuid()
})
export type TokenPayloadSchema = z.infer<typeof tokenPayloadSchema>
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(envService: EnvService) {
        const publicKey = envService.get("JWT_PUBLIC_KEY")
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // de onde está vindo o token
            secretOrKey: Buffer.from(publicKey, 'base64'),
            algorithms: ["RS256"],
        })
    }
    async validate(payload: TokenPayloadSchema) {
        return tokenPayloadSchema.parse(payload)
    }
}