import { Prisma, User as PrismaUser } from "@prisma/client";
import { Question } from "@/domain/forum/enterprise/entities/question";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Slug } from "@/domain/forum/enterprise/entities/value-objects/slug";
import { Student } from "@/domain/forum/enterprise/entities/student";

export class PrismaStudentMapper {
    static toDomain(raw: PrismaUser): Student {
        return Student.create({
            name: raw.name,
            email : raw.email,
            password : raw.password,
        },
            new UniqueEntityID(raw.id))
    }
    static toPrisma(student : Student) : Prisma.UserUncheckedCreateInput {
        return {
            id : student.id.toString(),
            name: student.name,
            email: student.email,
            password: student.password,
        }
    }
}