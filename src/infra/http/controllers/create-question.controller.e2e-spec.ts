import { AppModule } from '@/infra/app.module'
import { DataBaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { StudentFactory } from 'test/factories/make-student'


describe('Create question (E2E)', async () => {
    let app: INestApplication
    let prisma: PrismaService
    let jwt: JwtService
    let studentFactory: StudentFactory
    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule, DataBaseModule],
            providers: [StudentFactory]
        }).compile()

        app = moduleRef.createNestApplication()
        prisma = moduleRef.get(PrismaService)
        jwt = moduleRef.get(JwtService)
        studentFactory = moduleRef.get(StudentFactory)
        await app.init()
    })

    test('[POST] /questions', async () => {
        const userTest = await studentFactory.makePrismaStudent()
        const accessToken = jwt.sign({ sub: userTest.id.toString() })

        const response = await request(app.getHttpServer())
            .post('/questions')
            .set('Authorization', `Bearer ${accessToken}`)
            .send({
                title: 'Question 123',
                content: 'Question Content',
            })
        expect(response.statusCode).toBe(201)
        const questionOnDataBase = await prisma.question.findFirst({
            where: {
                title: 'Question 123'
            }
        })
        expect(questionOnDataBase).toBeTruthy()
    })
})