var express = require('express');
const { Createaccount } = require('../controller/CreateAccount');
const { Signin } = require('../controller/AccountSignin');
const { ProfileManage, GetProfile } = require('../controller/ProfileManage');
const JWTvarify = require('../controller/JWTvarify');
const { imagesUpload } = require('../controller/MulterControl');
var router = express.Router();

/* GET home page. */
router.post('/signup',Createaccount);
router.post('/signin',Signin);
router.get('/profile',JWTvarify,GetProfile);
router.put('/profileupdate',JWTvarify,imagesUpload,ProfileManage)


module.exports = router;
  