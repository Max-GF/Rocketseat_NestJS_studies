import { UseCaseError } from "@/core/errors/use-case-error";

export class InvalidAttachmentTypeError extends Error implements UseCaseError {
    constructor(errorText?: string){
        super(errorText ?? 'File is not valid')
    }
}