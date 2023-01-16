module.exports ={
    ensureAuthenticated: function(req,res,next){
        if(req.isAuthenticated()){
            return next();
        }
        req.flash('error_msg', 'Please Login to view Dashboard.Thank You!');
        res.redirect('/signin')
    }
}