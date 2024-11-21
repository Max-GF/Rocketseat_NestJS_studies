import { Question as PrismaQuestion } from "@prisma/client";
import { Question } from "@/domain/forum/enterprise/entities/question";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Slug } from "@/domain/forum/enterprise/entities/value-objects/slug";

export class PrismaQuestionMapper {
    static toDomain(raw: PrismaQuestion): Question {
        return Question.create({
            title: raw.title,
            authorId: new UniqueEntityID(raw.authorId),
            content : raw.content,
            bestAnswerId: undefined,
            slug: Slug.create(raw.slug),
            createdAt : raw.createdAt,
            updatedAt : raw.updatedAt,
        },
            new UniqueEntityID(raw.id))
    }
}