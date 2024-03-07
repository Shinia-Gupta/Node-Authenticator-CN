import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth2';
// import User from './models/User.js'; // Import your User model
import dotenv from'dotenv';
dotenv.config();
passport.use(new GoogleStrategy.Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8001/auth/google/callback",
    passReqToCallback: true
  },
  (request, accessToken, refreshToken, profile, done) => {
    // User.findOrCreate({ googleId: profile.id }, (err, user) => {
    //   return done(err, user);
    // });
   return done(null,profile)
  }
));

passport.serializeUser((user,done)=>{
    done(null,user);
})

passport.deserializeUser((user,done)=>{
    done(null,user);
})
export default passport;

