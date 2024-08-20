import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';

const streamifier = require('streamifier');

import { CloudinaryResponse } from 'src/model';
import cloudinaryConfig from 'src/lib/config/cloudinary.config';

@Injectable()
export class CloudinaryService {
  uploadImage(file: Express.Multer.File): Promise<CloudinaryResponse> {
    cloudinary.config({
      cloud_name: cloudinaryConfig().cloud_name,
      api_key: cloudinaryConfig().api_key,
      api_secret: cloudinaryConfig().api_secret,
    });

    return new Promise<CloudinaryResponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );

      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }
}
