
function Validator (name,email,password,roles){
    this.name       = name;
    this.email      = email;
    this.password   = password;
    this.roles       = roles;
    this.errors     = [];

  this.emailValidator = ()=>{
    return /\S+@\S+\.\S+/.test(this.email)
  }
  this.passwordValidator = ()=>{
    return /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/.test(this.password)
  }
  this.validation = ()=>{
    if (!this.name || !this.email || !this.password || !this.roles) 
      this.errors.push({ msg: 'Please enter all fields' });
    
    if(!this.emailValidator())
      this.errors.push({ msg: 'Email is not valid' });
    
    if(!this.passwordValidator())
      this.errors.push(
        {
          msg:'a password must be eight characters including one uppercase letter, one special character and alphanumeric characters'
        }
        )
    
   
    return this.errors

  }

  return {
    validation: this.validation
  }

}

module.exports = Validator;






  

  
  
  
  