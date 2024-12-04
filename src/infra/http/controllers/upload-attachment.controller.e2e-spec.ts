import { AppModule } from '@/infra/app.module'
import { DataBaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { QuestionFactory } from 'test/factories/make-question'
import { StudentFactory } from 'test/factories/make-student'


describe('Upload Attachments (E2E)', async () => {
    let app: INestApplication
    let prisma: PrismaService
    let studentFactory: StudentFactory
    let jwt: JwtService
    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule, DataBaseModule],
            providers: [StudentFactory,QuestionFactory]
        }).compile()

        app = moduleRef.createNestApplication()
        prisma = moduleRef.get(PrismaService)
        studentFactory = moduleRef.get(StudentFactory)
        jwt = moduleRef.get(JwtService)
        await app.init()

    })
    test('[POST] /attachments', async () => {
        const userTest = await studentFactory.makePrismaStudent()
        const accessToken = jwt.sign({ sub: userTest.id.toString() })
        
        const response = await request(app.getHttpServer())
            .post('/attachments')
            .set('Authorization', `Bearer ${accessToken}`)
            .attach('file', './test/e2e/image-for-upload-test.png')
        expect(response.statusCode).toBe(201)
    })
})