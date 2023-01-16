const express =require('express')
const router = express.Router();
const bcrypt = require ('bcryptjs');
const passport = require ('passport')

const User = require('../models/User');


router.get('/signIn',(req,res)=>res.render('signIn'));


router.get('/signUp',(req,res)=>res.render('signUp'));


// router.get('/signUp',signupController.signUp);
router.post('/signup',(req,res)=>{
    const{name, email,password, password2} = req.body;
    let errors = [];


    if(!name||!email || !password || !password2){
        errors.push({msg:'Please fill in all fields'});
    }
    if(password !==password2){
        errors.push({msg:'Password do not match'});
    }
    if(password.length < 6){
        errors.push({msg:'password should be at least 6 charachter'})
    }
    if(errors.length>0){
        res.render('signup',{
            errors,
            name,email,
            password,password2
        })
    }else{
        //validation passed
        User.findOne({email: email})
        .then(user =>{
            if(user){
                errors.push({msg:'Email is already registered'})
                res.render('signup',{
                    errors,
                    name,email,
                    password,password2
                });
            }else{
                const newUser = new User({
                    name,
                    email,
                    password
                });
                //hash pass
                bcrypt.genSalt(10, (err,salt)=> 
                bcrypt.hash(newUser.password, salt, (err,hash)=>{
                    if(err) throw err;
                    //set pass to hash
                    newUser.password= hash;
                    //save user
                    newUser.save()
                    .then(user =>{
                        req.flash('success_msg','You are successfully registered and now you can login.')
                        res.redirect('/signin');
                    })
                    .catch(err=>console.log(err));
                }))
            }
        });


    }

});
//login 
router.post('/signin',(req,res, next)=>{
    passport.authenticate('local',{
        successRedirect:'/dashboard',
        failureRedirect:'/signin',
        failureFlash: true
    })(req, res, next); 

});







module.exports = router