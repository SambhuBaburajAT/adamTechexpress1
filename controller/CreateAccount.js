const { UserModel } = require("../model/UserData");
const bcrypt = require("bcrypt");
const Createaccount = async (req, res) => {

try{
  var pattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  const emailtest = pattern.test(req.body.email);
  const password = req.body.password.length;
  const Name=req.body.name;
  if (emailtest) {
    // first check if this email already exist on db or not
    const EmailExist = await UserModel.findOne({ email: req.body.email });
    console.log(EmailExist);
    if (EmailExist) {
      res.status(401).json({
        status: "Email already Exist",
      });
    } else {
      if(Name.trim() != ''){
        if (password >= 5) {
          const hashedpass = await bcrypt.hash(req.body.password, 10);
  
          UserModel({
            name:Name,
            email: req.body.email,
            password: hashedpass,
            image:'' 
          }).save();
  
          res.status(200).json({ status: "account Created" });
        } else {
          res.status(406).json({
            status: "Password should be atleast 5 letters",
          });
        }
     
      }else{ 
        res.status(406).json({
          status: "Provide a Name",
        });
      }
   
    }
  } else {
    res.status(406).json({
      status: "Email not valid",
    });
  }
}catch(err){
  res.status(404).json({
    status:"somethingwent wrong"
  })
}


};
module.exports = { Createaccount };
