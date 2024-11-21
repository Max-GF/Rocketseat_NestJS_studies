import { AppModule } from '@/infra/app.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'


describe('Fetch Questions (E2E)', async () => {
    let app: INestApplication
    let prisma: PrismaService
    let jwt: JwtService
    const moduleRef = await Test.createTestingModule({
        imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService)
    jwt = moduleRef.get(JwtService)
    await app.init()

    test('[GET] /questions', async () => {
        const userTest = await prisma.user.create({
            data: {
                name: 'User for fetch questions test',
                email: 'userforfetchquestionstest@example.com',
                password: '123456',
            }
        })
        await prisma.question.createMany({
            data: [
                {
                title: 'Question to fetch test 1 title',
                content: 'Question to fetch test 1 content',
                authorId: userTest.id,
                slug : 'question-to-fetch-test-1-slug'
            },
                {
                title: 'Question to fetch test 2 title',
                content: 'Question to fetch test 2 content',
                authorId: userTest.id,
                slug : 'question-to-fetch-test-2-slug'
            }
            ]
        })
        const accessToken = jwt.sign({ sub: userTest.id })

        const response = await request(app.getHttpServer()).get('/questions')
            .set('Authorization', `Bearer ${accessToken}`)
            .send({
                title: 'Question 123',
                content: 'Question Content',
            })
        expect(response.statusCode).toBe(200)
        expect(response.body).toEqual({
            questions: expect.arrayContaining([
              expect.objectContaining({ title: 'Question to fetch test 1 title' }),
              expect.objectContaining({ title: 'Question to fetch test 2 title' }),
            ]),
          })
    })
})