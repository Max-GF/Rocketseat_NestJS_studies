import { AppModule } from '@/infra/app.module'
import { DataBaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { QuestionFactory } from 'test/factories/make-question'
import { StudentFactory } from 'test/factories/make-student'


describe('Get question by slug (E2E)', async () => {
    let app: INestApplication
    let prisma: PrismaService
    let studentFactory: StudentFactory
    let questionFactory: QuestionFactory
    let jwt: JwtService
    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule, DataBaseModule],
            providers: [StudentFactory,QuestionFactory]
        }).compile()

        app = moduleRef.createNestApplication()
        prisma = moduleRef.get(PrismaService)
        studentFactory = moduleRef.get(StudentFactory)
        questionFactory = moduleRef.get(QuestionFactory)
        jwt = moduleRef.get(JwtService)
        await app.init()

    })
    test('[GET] /questions/:slug', async () => {
        const userTest = await studentFactory.makePrismaStudent()
        const questionTest = await questionFactory.makePrismaQuestion({
            authorId : userTest.id,
        })
        const accessToken = jwt.sign({ sub: userTest.id.toString() })

        const response = await request(app.getHttpServer())
            .get(`/questions/${questionTest.slug.value}`)
            .set('Authorization', `Bearer ${accessToken}`)
            .send()
        expect(response.statusCode).toBe(200)
        expect(response.body).toEqual({
            question: expect.objectContaining({ title: questionTest.title }),
        })
    })
})