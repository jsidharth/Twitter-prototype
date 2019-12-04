import express from 'express';
import passport from 'passport';
import userRoutes from './userRoutes';
import imageUploadRoute from './imageUploadRoute';
import tweetRoutes from './tweetRoutes';
import searchRoutes from './searchRoutes';
import listRoutes from './listRoutes';
import messageRoutes from './messageRoutes';
import analyticsRoutes from './analyticsRoutes';

const routes = express.Router();

routes.use('/user', userRoutes);
routes.use('/image', passport.authenticate('jwt'), imageUploadRoute);
routes.use('/tweet', passport.authenticate('jwt'), tweetRoutes);
routes.use('/search', passport.authenticate('jwt'), searchRoutes);
routes.use('/list', passport.authenticate('jwt'), listRoutes);
routes.use('/message', passport.authenticate('jwt'), messageRoutes);
routes.use('/analytics', passport.authenticate('jwt'), analyticsRoutes);
// Healthcheck API for ELB
routes.get('/health', (req, res) => {
  if (req) {
    res.status(200).json({
      message: 'OK!',
    });
  }
});
export default routes;
