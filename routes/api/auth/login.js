const express     = require('express');
const passport    = require('passport');
const router      = express.Router();
const jwt         = require('jsonwebtoken');
const fs          = require('fs');
const privateKEY  = fs.readFileSync('./configs/private.key', 'utf8');




//Login
router.post('/', function(req, res, next) {

  passport.authenticate('local',{ session: false },function(err, user, info) {
    if (err) res.status(400).json({success:false, msg:info.message });
    if (!user)  return res.json({success:false,msg:"email or password are not valid"}); 
    req.logIn(user,{ session: false }, function(err) {
      if (err) res.status(500).json({success:false,msg:'some problem with login,please try again'})
      const payload = {id:user._id}
      jwt.sign(payload, privateKEY,{ expiresIn: '1d',algorithm: 'RS256'},(err,token)=>{
        if(err) res.status(400).json({msg:'missing credential'})
        res.cookie('jwt',`${token}`,{expires: new Date(Date.now() + 24*60*60*1000)});
        //req.session.jwt = `${token}`;
        res.status(200).send({success:true,name:user.name,roles:user.roles});
      });

    });
  })(req, res, next);
});



module.exports = router;