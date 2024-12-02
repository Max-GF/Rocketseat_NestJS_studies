import { Module } from "@nestjs/common";
import { CreateAccountController } from "./controllers/create-account.controller";
import { AuthenticateController } from "./controllers/authentificate.controller";
import { CreateQuestionController } from "./controllers/create-question.controller";
import { FetchRecentQuestionsController } from "./controllers/fetch-recent-questions.controller";
import { DataBaseModule } from "../database/database.module";
import { CreateQuestionUseCase } from "@/domain/forum/application/use-cases/create-question";
import { FetchRecentQuestionsUseCase } from "@/domain/forum/application/use-cases/fetch-recent-questions";
import { CryptographyModule } from "../cryptography/cryptography.module";
import { RegisterStudentUseCase } from "@/domain/forum/application/use-cases/register-student";
import { AuthenticateStudentUseCase } from "@/domain/forum/application/use-cases/authenticate-student";
import { GetQuestionBySlugsController } from "./controllers/get-question-by-slug.controller";
import { GetQuestionBySlugUseCase } from "@/domain/forum/application/use-cases/get-question-by-slug";
import { EditQuestionController } from "./controllers/edit-question.controller";
import { EditQuestionUseCase } from "@/domain/forum/application/use-cases/edit-question";
import { DeleteQuestionUseCase } from "@/domain/forum/application/use-cases/delete-question";
import { DeleteQuestionController } from "./controllers/delete-question.controller";

@Module({
    imports: [DataBaseModule, CryptographyModule],
    controllers: [
        CreateAccountController,
        AuthenticateController,
        CreateQuestionController,
        FetchRecentQuestionsController,
        GetQuestionBySlugsController,
        EditQuestionController,
        DeleteQuestionController,
    ],
    providers: [
        CreateQuestionUseCase,
        FetchRecentQuestionsUseCase,
        RegisterStudentUseCase,
        AuthenticateStudentUseCase,
        GetQuestionBySlugUseCase,
        EditQuestionUseCase,
        DeleteQuestionUseCase
    ],
})
export class HttpModule { }