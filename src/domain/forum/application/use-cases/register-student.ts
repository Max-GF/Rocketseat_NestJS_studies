import { StudentRepository } from '../repositories/student-repository'
import { Either, left, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { Student } from '../../enterprise/entities/student'
import { HashGenerator } from '../cryptography/hashe-generator'
import { StudentEmailAlreadyExistsError } from '../../errors/student-already-exists-error'

interface RegisterStudentUseCaseRequest {
    name: string
    email: string
    password: string
}

type RegisterStudentUseCaseResponse = Either<
StudentEmailAlreadyExistsError,
    {
        student: Student
    }
>
@Injectable()
export class RegisterStudentUseCase {
    constructor(
        private studentRepository: StudentRepository,
        private hashGenerator: HashGenerator,
    ) { }

    async execute({
        name,
        email,
        password
    }: RegisterStudentUseCaseRequest): Promise<RegisterStudentUseCaseResponse> {
        
        const studentWithSameEmail = await this.studentRepository.findByEmail(email)

        if (studentWithSameEmail){
            return left(new StudentEmailAlreadyExistsError(`E-mail "${email}" is already in use`))
        }
        const hashedPassword = await this.hashGenerator.hash(password)
        const student = Student.create({
            name,
            email,
            password : hashedPassword,
        })
        await this.studentRepository.create(student)

        return right({
            student,
        })
    }
}