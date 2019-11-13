import bcrypt from 'bcrypt';
import jwtSecret from './jwtConfig';
import { Users } from './sequelize';

const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const SALT_ROUND = 12;

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  'register',
  // eslint-disable-next-line new-cap
  new localStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    // eslint-disable-next-line consistent-return
    async (username, password, done) => {
      try {
        const user = await Users.findOne({
          where: {
            email: username,
          },
        });
        if (user) {
          return done(null, false);
        }
        const hashPassword = await bcrypt.hash(password, SALT_ROUND);
        const newUser = await Users.create({
          email: username,
          password: hashPassword,
        });
        if (newUser) {
          return done(null, true);
        }
      } catch (err) {
        done(err);
      }
    }
  )
);

passport.use(
  'login',
  // eslint-disable-next-line new-cap
  new localStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      session: false,
    },
    // eslint-disable-next-line consistent-return
    async (username, password, done) => {
      try {
        const user = await Users.findOne({
          where: {
            email: username,
          },
        });
        if (!user) {
          return done(null, false);
        }
        const result = await bcrypt.compare(password, user.password);
        if (!result) {
          console.log('Password does not match!');
          return done(null, false);
        }
        return done(null, true);
      } catch (err) {
        done(err);
      }
    }
  )
);

const options = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('JWT'),
  secretOrKey: jwtSecret.secret,
};

passport.use(
  'jwt',
  new JWTStrategy(options, async (jwtPayload, done) => {
    try {
      const user = await Users.findOne({
        where: {
          id: jwtPayload.id,
        },
      });
      if (user) done(null, true);
      else done(null, false);
    } catch (err) {
      done(err);
    }
  })
);
