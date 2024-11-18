import { AppModule } from '@/app.module'
import { PrismaService } from '@/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { hash } from 'bcryptjs'
import request from 'supertest'


describe('Authenticate (E2E)', async () => {
    let app: INestApplication
    let prisma: PrismaService
    const moduleRef = await Test.createTestingModule({
        imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService)
    await app.init()

    test('[POST] /authenticate', async () => {

        await prisma.user.create({
            data: {
                name: 'User for test 3',
                email: 'userfortest3@example.com',
                password: await hash('123456',8),
        }
        })
        const response = await request(app.getHttpServer()).post('/authenticate').send({
            email: 'userfortest3@example.com',
            password: '123456',
        })
        expect(response.statusCode).toBe(200)
        expect(response.body).toEqual({
            access_token: expect.any(String)
        })

    })
})