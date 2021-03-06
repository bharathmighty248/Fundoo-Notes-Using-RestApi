const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const logger = require('../config/logger');

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

passport.use(new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/login/google/callback"
    },
    (accessToken, refreshToken, profile, callback) => {
        const data = {
            profile,
            token: accessToken
        };
        logger.info("Google Authentication success");
        return callback(null, data);
    }
));
