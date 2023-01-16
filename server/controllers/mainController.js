





exports.homepage =async(req,res )=>{
    const locals={
        title:"Nodejs Notes",
        description:"Free NodeJS Notes"
    }

    res.render('index',{
        locals,
        // layout:'../views/layouts/front-page'


    }); 
}


exports.about =async(req,res )=>{
    const locals={
        title:"About",
        description:"Free NodeJS Notes"
    }

    res.render('about',locals); 
}