import express from 'express';
import userRoutes from './userRoutes';
import imageUploadRoute from './imageUploadRoute';
import tweetRoutes from './tweetRoutes';

const routes = express.Router();

routes.use('/user', userRoutes);
routes.use('/image', imageUploadRoute);
// TODO: Add authentication with passport
routes.use('/tweet', tweetRoutes);

export default routes;
