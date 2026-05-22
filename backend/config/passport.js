import passport from "passport";
import User from "../models/usersAuth.js";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        console.log('Profile received:', profile.id)
        let user = await User.findOne({
          googleID: profile.id,
        });
         console.log('User found:', user) 

        if (!user) {
           user = await User.create({
            googleID: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            avatar: profile.photos[0].value,
          });
        }
        return cb(null, user);
      } catch (error) {
        return cb(error, null);
      }
    },
  ),
);
