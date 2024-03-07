export const isAuth=(req,res,next)=>{
    if(req.session.isAuth){
        next();
    }else{
        res.render('login',{errMsg:'You are unauthorized to access the endpoint'});
    }
}