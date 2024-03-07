import express from "express";
import session from "express-session";
import expressEjsLayouts from "express-ejs-layouts";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import path from "path";
import passport from "passport";

import gauthRouter from "./src/routes/google-auth.routes.js";
import basicRouter from "./src/routes/basic.routes.js";
import hauthRouter from "./src/routes/github-auth.routes.js";

const app = express();
app.use(express.json());
app.use(session({
    secret: 'your_secret_key', // Change this to a secure random string
    resave: false,
    saveUninitialized: false,
    cookie: {
        // maxAge: 24 * 60 * 60 * 1000 // Session duration: 1 day
     secure:false
      }

  }));
//   app.use((req, res, next) => {
//     // Check if the user is authenticated
//     if (req.user) {
//         res.locals.useremail = req.user.email;
//         res.locals.username = req.user.name;
//     }
//     next();
// });
// app.use(express.static("public"));
app.use(express.static("src/views"));

  
app.use(cookieParser());
// app.use((req, res, next) => {
//   // Check if useremail and username are available in locals
//   res.locals.useremail = req.user ? req.user.email : null;
//   res.locals.username = req.user ? req.user.name : null;
//   next();
// });
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.set("views", path.join(path.resolve(), "src", "views"));
app.use(expressEjsLayouts);
app.use(passport.initialize());
app.use(passport.session());
app.use('/',basicRouter);
app.use('/auth',gauthRouter);
app.use('/hauth',hauthRouter);
export default app;
