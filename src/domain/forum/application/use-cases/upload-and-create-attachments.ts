import { StudentsRepository } from '../repositories/student-repository'
import { Either, left, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { Student } from '../../enterprise/entities/student'
import { HashGenerator } from '../cryptography/hashe-generator'
import { StudentEmailAlreadyExistsError } from '../../errors/student-already-exists-error'
import { InvalidAttachmentTypeError } from '../../errors/invalid-attachment-type'
import { Attachment } from '../../enterprise/entities/attachment'
import { AttachmentsRepository } from '../repositories/attachments-repository'
import { Uploader } from '../storage/uploader'

interface UploadAndCreateAttachmentUseCaseRequest {
    fileName: string
    fileType: string
    body: Buffer
}

type UploadAndCreateAttachmentUseCaseResponse = Either<
    InvalidAttachmentTypeError,
    {
        attachment: Attachment
    }
>
@Injectable()
export class UploadAndCreateAttachmentUseCase {
    constructor(
        private attachmentRepository: AttachmentsRepository,
        private uploader: Uploader,
    ) { }

    async execute({
        fileName,
        fileType,
        body,
    }: UploadAndCreateAttachmentUseCaseRequest): Promise<UploadAndCreateAttachmentUseCaseResponse> {

        if (!/^(image\/(jpeg|png))$|^application\/pdf$/.test(fileType)) {
            return left(new InvalidAttachmentTypeError(`Type ${fileType} is not valid`))
        }
        const {link} = await this.uploader.upload({
            fileName,
            fileType,
            body
        })
        const attachment = Attachment.create({
            link: link,
            title: fileName,
        })

        await this.attachmentRepository.create(attachment)
        return right({
            attachment,
        })
    }
}
