import { Module } from "@nestjs/common";
import { CreateAccountController } from "./controllers/create-account.controller";
import { AuthentificateController } from "./controllers/authentificate.controller";
import { CreateQuestionController } from "./controllers/create-question.controller";
import { FetchQuestionsController } from "./controllers/fetch-questions.controller";
import { DataBaseModule } from "../database/database.module";

@Module({
    imports : [DataBaseModule],
    controllers: [
        CreateAccountController,
        AuthentificateController,
        CreateQuestionController,
        FetchQuestionsController],
        
})
export class HttpModule { }