import express from 'express';
import userRoutes from './userRoutes';
import imageUploadRoute from './imageUploadRoute';
import tweetRoutes from './tweetRoutes';
import searchRoutes from './searchRoutes';
import listRoutes from './listRoutes';
import messageRoutes from './messageRoutes';

const routes = express.Router();

routes.use('/user', userRoutes);
routes.use('/image', imageUploadRoute);
// TODO: Add authentication with passport
routes.use('/tweet', tweetRoutes);
routes.use('/search', searchRoutes);
routes.use('/list', listRoutes);
routes.use('/message', messageRoutes);

export default routes;
