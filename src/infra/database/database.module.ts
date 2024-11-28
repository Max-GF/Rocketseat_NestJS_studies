import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { PrismaAnswerAttachmentsRepository } from "./prisma/repositories/prisma-answer-attachments-repository";
import { PrismaAnswerCommentsRepository } from "./prisma/repositories/prisma-answer-comments-repository";
import { PrismaQuestionAttachmentsRepository } from "./prisma/repositories/prisma-question-attachments-repository";
import { PrismaQuestionsRepository } from "./prisma/repositories/prisma-questions-repository";
import { PrismaAnswersRepository } from "./prisma/repositories/prisma-answer-repository";
import { PrismaQuestionCommentsRepository } from "./prisma/repositories/prisma-question-comments-repository";
import { QuestionsRepository } from "@/domain/forum/application/repositories/questions-repository";
import { StudentsRepository } from "@/domain/forum/application/repositories/student-repository";
import { PrismaStudentsRepository } from "./prisma/repositories/prisma-student-repository";

@Module({
    providers: [
        PrismaService,
        PrismaAnswersRepository,
        PrismaAnswerCommentsRepository,
        PrismaAnswerAttachmentsRepository,
        {
            provide: StudentsRepository, // Toda vez que um arquivo solicitar o QuestionsRepository (dependência)
            useClass: PrismaStudentsRepository, // O NestJS deve entender como sendo essa classe aqui
        },
        {
            provide: QuestionsRepository, // Toda vez que um arquivo solicitar o QuestionsRepository (dependência)
            useClass: PrismaQuestionsRepository, // O NestJS deve entender como sendo essa classe aqui
        },
        PrismaQuestionAttachmentsRepository,
        PrismaQuestionCommentsRepository,
    ],
    exports: [
        StudentsRepository,
        PrismaService,
        PrismaAnswersRepository,
        PrismaAnswerCommentsRepository,
        PrismaAnswerAttachmentsRepository,
        QuestionsRepository,
        PrismaQuestionAttachmentsRepository,
        PrismaQuestionCommentsRepository,
    ], // Esse "expors" é para quando eu for importar DataBaseModule ele carregar o Prisma junto
})
export class DataBaseModule {

}