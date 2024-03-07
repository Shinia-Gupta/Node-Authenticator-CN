import bcrypt from "bcrypt";
import { userModel } from "../models/user.model.js";
import { getOtp } from "../utils/generateOtp.util.js";
import mailSent from "../utils/sendMail.util.js";

export class BasicController {
  //Function to get User registration form
  getRegister(req, res) {
    res.render("register", {
      errMsg: null,
    });
  }

  //User Registration Function
  registerUser = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.render("register", { errMsg: "Both Fields are required"});
      }
      const hashedPassword = await bcrypt.hash(password, 10); // Hash the password with a salt of 10 rounds
      const newUser = new userModel({
        name: req.body.name,
        email,
        password: hashedPassword,
        googleId:null
      });
      await newUser.save();
      res.render("login", { errMsg: null });
    } catch (error) {
      console.log(error);
      res.render("register", {
        errMsg: "Something went wrong on our end. Please try again later"
      });
    }
  };

  //Function to get User login form
  getLogin = (req, res) => {
    res.render("login", { errMsg: null });
  };

  //User Login Function
//   loginUser = async (req, res, next) => {
//     try {
//       const { email, password } = req.body;
//       if (!email || !password) {
//         return res.render("login", { errMsg: "Both Fields are required",isAuth:req.cookies.user });
//       }
//       const validUser = await userModel.findOne({ email });
//       if (validUser) {
//         const isPasswordValid = await bcrypt.compare(
//           password,
//           validUser.password
//         ); // Compare the hashed password with the provided password
//         if (isPasswordValid) {
//           // Authentication successful
//           //   const token = await jwt.sign({ user: validUser }, process.env.JWT_SECRET, { expiresIn: "2h" });
//           //   res.cookie("jwttoken", token, { maxAge: 2 * 60 * 60 * 1000 });
//           //   const students = await studModel.find({});
//         //   res.cookie('email',email,{
//         //     maxAge:2*60*60*60
//         //   })
//           res.cookie('user',validUser,{maxAge:24*60*60*60});
//           req.session.isAuth=true;
//           req.session.alreadyAuth=true;
//           res.render("home", {
//             useremail: validUser.email,
//             username: validUser.name,
//             isAuth:req.cookies.user,
//             successMsg:null
//           });
//         } else {
//           // Invalid credentials
//           res.render("login", { errMsg: "Invalid Credentials!" ,isAuth:req.cookies.user});
//         }
//       } else {
//         // Email not found
//         res.render("login", {
//           errMsg: "Email does not exist! Please register to continue",isAuth:req.cookies.user
//         });
//       }
//     } catch (error) {
//       console.log(error);
//       res.render("login", {
//         errMsg: "Something went wrong on our end. Please try again later",isAuth:req.cookies.user
//       });
//     }
//   };
loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email) {
            return res.render("login", { errMsg: " Fields are required" });
        }
        const validUser = await userModel.findOne({ email });
        if(validUser.password===null && validUser.googleId){
          res.render('login',{errMsg:"Please signin with google"})
        }else if(validUser.password===null && validUser.githubId){
          res.render('login',{errMsg:"Please signin with github"})
        }else{
        if (validUser) {
            const isPasswordValid = await bcrypt.compare(password, validUser.password);
            if (isPasswordValid) {
                // Authentication successful
                res.cookie('name', validUser.name, { maxAge: 24 * 60 * 60 * 1000 });
                req.session.user = validUser; // Set the user object in session
                req.session.useremail=validUser.email;
                req.session.username=validUser.name;
                
                res.cookie('email',validUser.email,{maxAge:24*60*60*60});
                req.session.isAuth = true;
                // req.session.alreadyAuth = true;
                res.render("home", {
                    useremail: validUser.email,
                    username: validUser.name,
                    isAuth: req.cookies.user,
                    successMsg: null
                });
            } else {
                // Invalid credentials
                res.render("login", { errMsg: "Invalid Credentials!" });
            }
        } else {
            // Email not found
            res.render("login", { errMsg: "Email does not exist! Please register to continue" });
        }
      }
    } catch (error) {
        console.log(error);
        res.render("login", { errMsg: "Something went wrong on our end. Please try again later" });
    }
  
};

getchangePassword=(req,res,next)=>{
  res.render('changePassword',{errMsg:null,email:req.params.email,useremail: req.cookies.email,
    username: req.cookies.name});
}
changePassword=async (req,res,next)=>{
  const pass1=req.body.pass1;
  const pass2=req.body.pass2;
  if(pass1===pass2){
      const newPass=await bcrypt.hash(pass1,10);
const userToUpdate=await userModel.findOne({email:req.params.email});
if(userToUpdate){
  userToUpdate.password=newPass;
await userToUpdate.save();
res.redirect('/login');
}
  }else{
    res.render('changePassword',{errMsg:'Passwords do not match',email:req.params.email,useremail: req.cookies.email,
    username: req.cookies.name});

  }
}
  //Function for User signout
  logout = async (req, res, next) => {
    try {
        res.clearCookie('name','email'); // Clear the cookies
      req.session.destroy((err) => {
        if (err) {
          console.error("Error destroying session:", err);
        }
        res.redirect("/login"); // Redirect to the login page
      });
    } catch (error) {
      console.error("Logout Error:", error);
      res.redirect("/login"); // Redirect to the login page even if an error occurs
    }
  };

  getOtpEmail=(req,res,next)=>{
    res.render('getEmail',{errMsg:null});
  }
  getOtpCheckerPage = async (req, res, next) => {
    const email = req.body.email;
    // console.log(email);
    const user = await userModel.findOne({ email });
    console.log(user);
    if (user) {
        const otp = getOtp();
        console.log(otp);
        res.cookie("otp", otp, {
            maxAge: 5 * 60 * 60,
        }).cookie('toEmail', email, {
            maxAge: 20 * 60 * 60
        });
        const resp =await mailSent(email);
        // console.log(resp);
        res.render("EnterOtp",{ errMsg: null});
    } else {
        res.render('getEmail', { errMsg: 'Invalid Email'});
    }
};


  getresetPassword=async(req,res,next)=>{
    const otp=req.body.otp;
    if(req.cookies.otp==otp){
        res.render('resetPassword',{errMsg:null});
    }else{
        res.render('login',{errMsg:'OTP did not match'});
    }
  }
  resetPassword=async(req,res,next)=>{
    const pass1=req.body.pass1;
    const pass2=req.body.pass2;
    if(pass1===pass2){
        const newPass=await bcrypt.hash(pass1,10);
const userToUpdate=await userModel.findOne({email:req.cookies.toEmail});
if(userToUpdate){
    userToUpdate.password=newPass;
await userToUpdate.save();
res.redirect('/login');
}
    }else{
      res.render('resetPassword',{errMsg:'Passwords do not match'});

    }
  }

  getHome=(req,res)=>{
    res.render('home',{successMsg:null,useremail: req.cookies.email,
        username: req.cookies.name});
  }
}
