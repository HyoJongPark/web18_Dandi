import { Injectable } from '@nestjs/common';
import { ImagesRepository } from './images.repository';

@Injectable()
export class ImagesService {
  constructor(private readonly imagesRepository: ImagesRepository) {}

  async uploadDiaryImage(userId: number, file: Express.Multer.File) {
    const today = new Date();
    const middlePath = `${today.getFullYear()}/${today.getMonth() + 1}`;

    return await this.imagesRepository.uploadImage(userId, file, middlePath);
  }

  async uploadProfileImage(userId: number, file: Express.Multer.File) {
    return await this.imagesRepository.uploadImage(userId, file, 'profile');
  }
}