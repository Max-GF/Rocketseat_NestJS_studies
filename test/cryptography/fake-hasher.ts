import { HashComparer } from "@/domain/forum/application/cryptography/hashe-comparer";
import { HashGenerator } from "@/domain/forum/application/cryptography/hashe-generator";

export class FakeHasher implements HashGenerator, HashComparer {
    async hash(plainText: string): Promise<string> {
        return plainText.concat('-hashed')
    }
    async compare(plainText: string, hashedText: string): Promise<boolean> {
        return plainText.concat('-hashed') === hashedText
    }
}