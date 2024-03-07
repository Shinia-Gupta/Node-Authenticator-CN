import passport from 'passport';
import GithubStrategy from 'passport-github2';
// import User from './models/User.js'; // Import your User model
import dotenv from'dotenv';
dotenv.config();
passport.use(new GithubStrategy.Strategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:8001/hauth/github/callback",
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

