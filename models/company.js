const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    lowercase:true,
    unique:true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  roles: {
    type:Array,
    required:true
  },
  customers:{
    type:Array
  },
  date: {
    type: Date,
    default: Date.now
  }
  
});

const Company = mongoose.model('Company', CompanySchema);

module.exports = Company;