import sanitizeHtml from 'sanitize-html';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import User from '../models/User.js';
import { signToken } from '../utils/token.js';

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/api/auth/google/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;
        let user = await User.findOne({ email });
        if (!user) {
          user = await User.create({
            firstName: profile.name?.givenName || 'Google',
            lastName: profile.name?.familyName || 'User',
            email,
            providers: { google: { sub: profile.id } }
          });
        }
        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: '/api/auth/facebook/callback',
      profileFields: ['id', 'emails', 'name']
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;
        let user = await User.findOne({ email });
        if (!user) {
          user = await User.create({
            firstName: profile.name?.givenName || 'Facebook',
            lastName: profile.name?.familyName || 'User',
            email,
            providers: { facebook: { sub: profile.id } }
          });
        }
        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

export const register = async (req, res, next) => {
  try {
    const payload = {
      firstName: sanitizeHtml(req.body.firstName),
      lastName: sanitizeHtml(req.body.lastName),
      email: sanitizeHtml(req.body.email),
      password: req.body.password
    };
    const user = await User.create(payload);
    const token = signToken(user);
    res.json({ token, user });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }
    const token = signToken(user);
    res.json({ token, user });
  } catch (error) {
    next(error);
  }
};

export const oauthCallback = (provider) => (req, res) => {
  const token = signToken(req.user);
  res.json({ token, user: req.user });
};

export const oauthToken = async (req, res, next) => {
  try {
    const { provider, token } = req.body;
    const profileId = `${provider}:${token}`;
    let user = await User.findOne({ [`providers.${provider}.sub`]: profileId });
    if (!user) {
      user = await User.create({
        firstName: provider,
        lastName: 'User',
        email: `${profileId}@oauth.lumina`,
        providers: { [provider]: { sub: profileId } }
      });
    }
    res.json({ token: signToken(user), user });
  } catch (error) {
    next(error);
  }
};

export const logout = (req, res) => {
  res.json({ message: 'Sesión cerrada' });
};
