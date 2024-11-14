import { AppModule } from '@/app.module'
import { PrismaService } from '@/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'


describe('Create account (E2E)', async () => {
    let app: INestApplication
    let prisma : PrismaService
    const moduleRef = await Test.createTestingModule({
        imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService)
    await app.init()

    test('[POST] /create_accounts', async () => {
        const response = await request(app.getHttpServer()).post('/create_accounts').send({
            name: 'Jhon Doeee',
            email: 'johndoeee@example.com',
            password: '123456',
        })
        expect(response.statusCode).toBe(201)
        const userOnDataBase = await prisma.user.findUnique({
            where: {
                email : 'johndoe@example.com'
            }
        })
        expect(userOnDataBase).toBeTruthy()
    })
})