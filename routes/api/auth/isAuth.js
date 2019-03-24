const express  = require('express');
const router   = express.Router();
const passport = require('passport');


// Dashboard

router.get('/',function(req,res,next){
  passport.authenticate('jwt', {session: false},function(err,user,info){
    if(err) return res.status(400).json({success:false, msg:info.message });
    if(!user) return res.json({success:false,msg:'user not found'}) 
    res.status(200).json({success:true,name:user.name,roles:user.roles});
  })(req, res, next)

})

module.exports = router;



