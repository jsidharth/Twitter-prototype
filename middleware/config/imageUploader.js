import { uploader } from './cloudinary';

const handleUpload = async file => {
  const result = await uploader.upload(file, {
    transformation: [
      {
        width: 175,
        height: 125,
        crop: 'scale',
      },
    ],
  });
  const image = result.url;
  return {
    image,
  };
};
// eslint-disable-next-line import/prefer-default-export
export { handleUpload };
