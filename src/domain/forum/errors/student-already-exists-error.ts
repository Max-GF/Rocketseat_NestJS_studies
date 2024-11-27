import { UseCaseError } from "@/core/errors/use-case-error";

export class StudentEmailAlreadyExistsError extends Error implements UseCaseError {
    constructor(errorText?: string){
        super(errorText ?? 'Student e-mail already exists.')
    }
}