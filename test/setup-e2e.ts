import { PrismaClient } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { execSync } from 'node:child_process'
import { config } from 'dotenv'
import { envSchema } from '@/infra/env/env'

config({ path: '.env', override: true })
config({ path: '.env.test', override: true })
let prisma: PrismaClient
const env = envSchema.parse(process.env)
const schemaId = randomUUID()

function generateUniqueDataBaseURL(schemaId: string): string {
    if (!env.DATABASE_URL) {
        throw new Error('Please provide a DATABASE_URL environment variable')
    }
    const url = new URL(env.DATABASE_URL)
    url.searchParams.set('schema', schemaId)
    return url.toString()
}
beforeAll(async () => {
    const databaseURL = generateUniqueDataBaseURL(schemaId)
    process.env.DATABASE_URL = databaseURL
    prisma = new PrismaClient()
    execSync('pnpm prisma migrate deploy') // ele só roda as migrations no banco, já o dev ele gera novas se tiver mudanças 
})
afterAll(async () => {
    // const currentSchema = await prisma.$queryRawUnsafe('SELECT current_schema()')
    await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schemaId}" CASCADE`)
    await prisma.$disconnect()
})