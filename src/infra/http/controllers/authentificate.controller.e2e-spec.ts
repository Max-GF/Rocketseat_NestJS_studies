import { AppModule } from '@/infra/app.module'
import { DataBaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { hash } from 'bcryptjs'
import request from 'supertest'
import { QuestionFactory } from 'test/factories/make-question'
import { StudentFactory } from 'test/factories/make-student'


describe('Authenticate (E2E)', async () => {
    let app: INestApplication
    let prisma: PrismaService
    let studentFactory: StudentFactory
    let questionFactory: QuestionFactory

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule, DataBaseModule],
            providers: [StudentFactory, QuestionFactory]
        }).compile()

        app = moduleRef.createNestApplication()
        prisma = moduleRef.get(PrismaService)
        studentFactory = moduleRef.get(StudentFactory)
        await app.init()
    })

    test('[POST] /authenticate', async () => {

        await studentFactory.makePrismaStudent({
            email: 'userforauthtest@example.com',
            password: await hash('123456', 8),
        })
        const response = await request(app.getHttpServer()).post('/authenticate').send({
            email: 'userforauthtest@example.com',
            password: '123456',
        })
        expect(response.statusCode).toBe(200)
        expect(response.body).toEqual({
            access_token: expect.any(String)
        })

    })
})