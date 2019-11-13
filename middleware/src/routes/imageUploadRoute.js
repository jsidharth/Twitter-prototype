import express from 'express';
import { multerUploads, dataUri } from '../../config/multer';
import { cloudinaryConfig } from '../../config/cloudinary';
import { handleUpload } from '../../config/imageUploader';

const imageUploadRouter = express.Router();

imageUploadRouter.post('/upload/image', multerUploads, cloudinaryConfig, (req, res) => {
  console.log('Inside POST user upload image');
  console.log('Request Body: ', req.body);
  let file;
  if (req.file) {
    file = dataUri(req).content;
  } else {
    res.status(400).json({
      message: 'File not uploaded!',
    });
  }
  handleUpload(file)
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

export default imageUploadRouter;
