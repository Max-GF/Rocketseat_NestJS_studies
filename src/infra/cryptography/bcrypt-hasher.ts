import { HashComparer } from "@/domain/forum/application/cryptography/hashe-comparer";
import { HashGenerator } from "@/domain/forum/application/cryptography/hashe-generator";
import { Injectable } from "@nestjs/common";
import { compare, hash } from "bcryptjs";

@Injectable()
export class BCryptHashser implements HashGenerator, HashComparer {
    async hash(plainText: string): Promise<string> {
        return hash(plainText, 8)
    }
    async compare(plainText: string, hashedText: string): Promise<boolean> {
        return compare(plainText, hashedText)
    }
}