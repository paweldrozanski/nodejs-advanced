const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('User');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: 'http://localhost:3001/auth/google/callback',
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const prof = {
          id: 1,
          displayName: 'Pawcio'
        }
        console.log('trying to log...')
        console.log('profile from google:')
        console.log(profile)
        console.log('switched to prof:')
        console.log(prof)
        // const existingUser = await User.findOne({ googleId: profile.id });
        const existingUser = await User.findOne({ googleId: profile.id });
        console.log('existing user:')
        console.log(existingUser)

        if (existingUser) {
          return done(null, existingUser);
        }
        const user = await new User({
          googleId: profile.id,
          displayName: profile.displayName
        }).save();
        console.log('new user')
        console.log(user)
        done(null, user);
      } catch (err) {
        console.log('Error:')
        console.log(err)
        done(err, null);
      }
    }
  )
);
