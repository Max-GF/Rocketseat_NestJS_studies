import { Encrypter } from "@/domain/forum/application/cryptography/encrypter";
import { Module } from "@nestjs/common";
import { JwtEncypter } from "./jwt-encrypter";
import { HashComparer } from "@/domain/forum/application/cryptography/hashe-comparer";
import { BCryptHashser } from "./bcrypt-hasher";
import { HashGenerator } from "@/domain/forum/application/cryptography/hashe-generator";

@Module({
    providers: [
        { provide: Encrypter, useClass: JwtEncypter },
        { provide: HashComparer, useClass: BCryptHashser },
        { provide: HashGenerator, useClass: BCryptHashser },
    ],
    exports: [
        Encrypter,
        HashComparer,
        HashGenerator,
    ]
})
export class CryptographyModule {

}