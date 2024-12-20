import { AppModule } from '@/infra/app.module'
import { DataBaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'


describe('Create account (E2E)', async () => {
    let app: INestApplication
    let prisma: PrismaService

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule],
        }).compile()

        app = moduleRef.createNestApplication()
        prisma = moduleRef.get(PrismaService)
        await app.init()
    })

    test('[POST] /create_accounts', async () => {
        const response = await request(app.getHttpServer()).post('/create_accounts')
            .send({
                name: 'User for create account test',
                email: 'userforcreateaccunttest@example.com',
                password: '123456',
            })
        expect(response.statusCode).toBe(201)
        const userOnDataBase = await prisma.user.findUnique({
            where: {
                email: 'userforcreateaccunttest@example.com'
            }
        })
        expect(userOnDataBase).toBeTruthy()
    })
})