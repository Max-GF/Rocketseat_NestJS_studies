import { StudentsRepository } from '../repositories/student-repository'
import { Either, left, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { HashComparer } from '../cryptography/hashe-comparer'
import { Encrypter } from '../cryptography/encrypter'
import { StudentWrongCredentialsError } from '../../errors/wrong-credentials-error'

interface AuthenticateStudentUseCaseRequest {
    email: string
    password: string
}

type AuthenticateStudentUseCaseResponse = Either<
StudentWrongCredentialsError,
    {
        accessToken: string
    }
>
@Injectable()
export class AuthenticateStudentUseCase {
    constructor(
        private studentsRepository: StudentsRepository,
        private hashComparer: HashComparer,
        private encrypter : Encrypter,
    ) { }

    async execute({
        email,
        password
    }: AuthenticateStudentUseCaseRequest): Promise<AuthenticateStudentUseCaseResponse> {
        
        const studentToAuthenticate = await this.studentsRepository.findByEmail(email)


        if (!studentToAuthenticate){
            return left(new StudentWrongCredentialsError())
        }
        
        const isPasswordCorrect = await this.hashComparer.compare(password, studentToAuthenticate.password)
        
        if (!isPasswordCorrect){
            return left(new StudentWrongCredentialsError())
        }

        const accessToken = await this.encrypter.encrypt({sub : studentToAuthenticate.id.toString()})

        return right({
            accessToken,
        })
    }
}
