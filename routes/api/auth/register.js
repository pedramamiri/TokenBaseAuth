const express   = require('express');
const router    = express.Router();
const bcrypt    = require('bcryptjs');
const fetch     = require("node-fetch");


// Load Company model
const Company   = require('../../../models/company');
const Validator = require('../../../configs/validator')



// Register a new company
router.post('/', (req, res) => {
  const {name,email,password,roles} = req.body
  var validator = new Validator(name,email,password,roles);
  let errors = validator.validation();

  if (errors.length > 0) {
    res.send(errors);
  } else {
    Company.findOne({ email: email }).then(company => {
      if (company) {
        errors.push({ msg: 'Email already exists' });
        res.send(errors);
      } else {
        let data ={
          name,
          email,
          password,
          roles
        }
        if(roles.includes('Brand')){
          data.costumers = []
        }  
        const newCompany  = new Company(data)
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newCompany.password, salt, (err, hash) => {
            if (err) throw err;
            newCompany.password = hash;
            const registration = {};
            newCompany
              .save()
              .then(company =>{
                registration.saveInMongo = true;
                registration.company = company
                res.json(registration)
/* 
                return fetch('http://localhost:6000/',
                    {
                        method: "POST", 
                        mode: "no-cors", 
                        cache: "no-cache", 
                        credentials: "include", 
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(company), 
                    }) */
              })
           /*    .then(Response =>{
                if(Response.status === 200){
                  registration.saveInSQL = true;
                  res.json(registration)
                }
                else{
                  if(registration.saveInMongo){
                    return Company.findByIdAndRemove(registration.company._id)
                  }  
                  else
                    res.json({msg:"bad requset"})  
                }
              })  */ 
      /*         .then(removedCompany=>{
                removedCompany ?
                res.json(
                {
                msg:"some problem in server,delete company from mongoDB",
                companyId:removedCompany._id
                })
                :
                null
              })
              .catch(err =>{
                if(registration.saveInMongo){
                  Company.findByIdAndRemove(registration.company._id)
                   .then(()=>res.sendStatus(500).send(err))
                }else{
                  res.sendStatus(500).send(err)
                }
              }); */
          });
        });
      }
    });
  }
});




module.exports = router;