const { default: mongoose } = require("mongoose");
const { UserModel } = require("../model/UserData");
const fs = require('fs');
const GetProfile = async (req, res) => {
  const User = req.LoggeDInUser;
  const userData = await UserModel.findById(
    new mongoose.Types.ObjectId(User._id)
  );
  res.status(200).json(userData);
};

const ProfileManage = async (req, res) => {
  const { Name } = req.body;
  const User = req.LoggeDInUser;
  const userId = new mongoose.Types.ObjectId(req.LoggeDInUser._id);

  if (Name.trim() != "") {
    
    console.log(Name);
    console.log(userId);
   
    await UserModel.findByIdAndUpdate(userId, { name: Name })
  }
  if (req.file) {
    const prevImage =await  UserModel.findById(userId);
    console.log(prevImage);
    
  
    await UserModel.findByIdAndUpdate(userId, { image: req.file.filename });
  }

  console.log(userId);

  res.json({ message: "Profile Updated" });
};
module.exports = { ProfileManage, GetProfile };
