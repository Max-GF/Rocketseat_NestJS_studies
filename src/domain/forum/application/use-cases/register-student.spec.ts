import { InMemoryStudentRepository } from 'test/repositories/in-memory-student-repository'
import { RegisterStudentUseCase } from './register-student'
import { FakeHasher } from 'test/cryptography/fake-hasher'

let inMemoryStudentRepository: InMemoryStudentRepository
let fakeHasher: FakeHasher
let sut: RegisterStudentUseCase
describe('Register Student', () => {
    beforeEach(() => {
        inMemoryStudentRepository = new InMemoryStudentRepository()
        fakeHasher = new FakeHasher()
        sut = new RegisterStudentUseCase(
            inMemoryStudentRepository,
            fakeHasher,
        )
    })

    it('Should be able to register a student', async () => {
        await sut.execute({
            name: 'Test Student',
            email: 'TesteStudent@test.com',
            password: '123456'
        })
        const hashedPassword = await fakeHasher.hash('123456')
        console.log(inMemoryStudentRepository.items[0])
        console.log(hashedPassword)
        expect(inMemoryStudentRepository.items[0]).toEqual(
            expect.objectContaining({
                name: 'Test Student',
                email: 'TesteStudent@test.com',
                password: hashedPassword
            })
        )
    })
    it('Should not be able to register a student with a email that is already in use', async () => {
        await sut.execute({
            name: 'Test Student',
            email: 'TesteStudent@test.com',
            password: '123456'
        })
        const hashedPassword = await fakeHasher.hash('123456')
        expect(inMemoryStudentRepository.items[0]).toEqual(
            expect.objectContaining({
                name: 'Test Student',
                email: 'TesteStudent@test.com',
                password: hashedPassword
            })
        )

        const result = await sut.execute({
            name: 'Test Student',
            email: 'TesteStudent@test.com',
            password: '123456'
        })
        expect(result.isLeft()).toBe(true)

    })
})
