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
import { AnswersRepository } from "@/domain/forum/application/repositories/answers-repository";
import { AnswerAttachmentsRepository } from "@/domain/forum/application/repositories/answer-attachments-repository";
import { AnswerCommentsRepository } from "@/domain/forum/application/repositories/answer-comments-repository";
import { QuestionAttachmentsRepository } from "@/domain/forum/application/repositories/question-attachments-repository";
import { QuestionCommentsRepository } from "@/domain/forum/application/repositories/question-comments-repository";

@Module({
    providers: [
        PrismaService,
        {
            provide: StudentsRepository, // Toda vez que um arquivo solicitar o QuestionsRepository (dependência)
            useClass: PrismaStudentsRepository, // O NestJS deve entender como sendo essa classe aqui
        },
        {
            provide: QuestionsRepository, // Toda vez que um arquivo solicitar o QuestionsRepository (dependência)
            useClass: PrismaQuestionsRepository, // O NestJS deve entender como sendo essa classe aqui
        },
        {
            provide: AnswersRepository,
            useClass: PrismaAnswersRepository,
        },
        {
            provide: AnswerCommentsRepository,
            useClass: PrismaAnswerCommentsRepository,
        },
        {
            provide: AnswerAttachmentsRepository,
            useClass: PrismaAnswerAttachmentsRepository,
        },
        {
            provide: QuestionCommentsRepository,
            useClass: PrismaQuestionCommentsRepository,
        },
        {
            provide: QuestionAttachmentsRepository,
            useClass: PrismaQuestionAttachmentsRepository,
        },
    ],
    exports: [
        PrismaService,
        StudentsRepository,
        AnswersRepository,
        AnswerCommentsRepository,
        AnswerAttachmentsRepository,
        QuestionsRepository,
        QuestionAttachmentsRepository,
        QuestionCommentsRepository,
    ], // Esse "expors" é para quando eu for importar DataBaseModule ele carregar o Prisma junto
})
export class DataBaseModule {

}