const { default: mongoose } = require('mongoose');
const Note = require('../models/Notes');



exports.dashboard =async(req,res )=>{
    let perPage = 12;
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
            }); 
        })


       
        res.render('dashboard/index',{
            locals,
            notes,
            layout:'../views/layouts/dashboard',
            name: req.user.name    
    
        }); 
    } catch (error) {
        
    }



   
}