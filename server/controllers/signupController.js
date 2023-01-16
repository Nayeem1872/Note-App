exports.signup =async(req,res )=>{
    const locals={
        title:"signup",
        description:"Free NodeJS Notes"
    }

    res.render('signup',{
        locals,
        layout:'../views/layouts/signUp'


    }); 
}