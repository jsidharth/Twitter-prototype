import express from 'express';
import userRoutes from './userRoutes';
import imageUploadRoute from './imageUploadRoute'

const routes = express.Router();

routes.use('/user', userRoutes);
routes.use('/', imageUploadRoute);

export default routes;
