import { PrismaClient } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { execSync } from 'node:child_process'
import 'dotenv/config'

const prisma = new PrismaClient()
const schemaId = randomUUID()

function generateUniqueDataBaseURL(schemaId: string): string {
    if (!process.env.DATABASE_URL) {
        throw new Error('Please provide a DATABASE_URL environment variable')
    }
    const url = new URL(process.env.DATABASE_URL)
    url.searchParams.set('schema', schemaId)
    return url.toString()
}
beforeAll(async () => {
    const databaseURL = generateUniqueDataBaseURL(schemaId)
    process.env.DATABASE_URL = databaseURL
    execSync('pnpm prisma migrate deploy') // ele só roda as migrations no banco, já o dev ele gera novas se tiver mudanças 
})
afterAll(async () => {
    await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schemaId}" CASCADE`)
    await prisma.$disconnect()
})