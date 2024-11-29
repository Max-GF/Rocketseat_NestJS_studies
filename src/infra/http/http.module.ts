import { Module } from "@nestjs/common";
import { CreateAccountController } from "./controllers/create-account.controller";
import { AuthenticateController } from "./controllers/authentificate.controller";
import { CreateQuestionController } from "./controllers/create-question.controller";
import { FetchQuestionsController } from "./controllers/fetch-questions.controller";
import { DataBaseModule } from "../database/database.module";
import { CreateQuestionUseCase } from "@/domain/forum/application/use-cases/create-question";
import { FetchRecentQuestionsUseCase } from "@/domain/forum/application/use-cases/fetch-recent-questions";
import { CryptographyModule } from "../cryptography/cryptography.module";
import { RegisterStudentUseCase } from "@/domain/forum/application/use-cases/register-student";
import { AuthenticateStudentUseCase } from "@/domain/forum/application/use-cases/authenticate-student";
import { APP_GUARD } from "@nestjs/core";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@Module({
    imports: [DataBaseModule, CryptographyModule],
    controllers: [
        CreateAccountController,
        AuthenticateController,
        CreateQuestionController,
        FetchQuestionsController,
    ],
    providers: [
        CreateQuestionUseCase,
        FetchRecentQuestionsUseCase,
        RegisterStudentUseCase,
        AuthenticateStudentUseCase,
    ],
})
export class HttpModule { }