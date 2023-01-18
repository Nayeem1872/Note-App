const { default: mongoose } = require('mongoose');
const Note = require('../models/Notes');



exports.dashboard =async(req,res )=>{
    let perPage = 8;
        let page = req.query.page || 1

    const locals={
        title:"Dashboard",
        description:"Free NodeJS Notes"
    }
    try {
        Note.aggregate([
            {
                $sort:{
                    createdAt:-1
                }
            },
            {$match:{user:mongoose.Types.ObjectId(req.user.id)}},
            {
                $project:{
                    title:{ $substr:['$title', 0, 30]},
                    body:{ $substr:['$title', 0, 100]},
                }
            }

        ]).skip(perPage * page- perPage)
        .limit(perPage)
        .exec(function(err,notes){
            Note.count().exec(function(err,count){
                if(err) return next(err);
                res.render('dashboard/index',{
                    locals,
                    notes,
                    layout:'../views/layouts/dashboard',
                    name: req.user.name, 
                    current:page,
                    pages: Math.ceil(count/perPage) 
            }); 
        })


       
         
    
        }); 
    } catch (error) {
        console.log(error);
    }



   
};




//view


exports.dashboardViewNote = async (req,res)=>{
    const note = await Note.findById({_id: req.params.id }).where({user: req.user.id }).lean();

    if(note){
        res.render("dashboard/view-notes",{
            noteID:req.params.id,
            note,
            layout:"../views/layouts/dashboard"
        });
    }else{
        res.send("something went wrong.")
    }

};


exports.dashboardUpdateNote = async (req,res)=>{
    try {
        await Note.findOneAndUpdate(
            {_id:req.params.id },
            {title:req.body.title, body: req.body.body}
        ).where({user:req.user.id});
        res.redirect('/dashboard')
    } catch (error) {
        console.log(error)
    }
};





exports.dashboardDeleteNote = async (req,res)=>{
    try {
        await Note.deleteOne({_id:req.params.id}).where({user:req.user.id});
        res.redirect('/dashboard')

    } catch (error) {
        console.log(error);
        
    }




}


exports.dashboardAddNote = async (req,res)=>{

    res.render('dashboard/add',{

        layout:'../views/layouts/dashboard'
    });

   
}

exports.dashboardAddNoteSubmit = async (req,res)=>{
try {


    req.body.user= req.user.id
    await Note.create(req.body)
    res.redirect('/dashboard')
    
} catch (error) {
    console.log(error)
}


}