const { UserModel } = require("../model/UserData");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Signin = async (req, res) => {
  const { email, password } = req.body;

  const User = await UserModel.findOne({ email: email });

  if (User) {
    const passwordCheck = await bcrypt.compare(password, User.password);
    if (passwordCheck) {
      console.log(process.env.accessToken);
      console.log(User);
      const token = jwt.sign(User.toJSON(), process.env.accessToken, {
        expiresIn: "20d",
      });
      res.status(200).json({ token, User });

      console.log(token);
    } else {
      res.status(401).json({  
        status: "User/Password incorrect",
      });
    }
  } else {
    res.json({
      status: "User/Password incorrect",
    });
  }
};
module.exports = { Signin };
