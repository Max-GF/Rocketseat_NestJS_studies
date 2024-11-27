import { UseCaseError } from "@/core/errors/use-case-error";

export class StudentWrongCredentialsError extends Error implements UseCaseError {
    constructor(errorText?: string){
        super(errorText ?? 'Credentials are no valid')
    }
}