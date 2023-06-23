// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import connectDb from "../../middleware/mongoose";
import User from "../../models/user";
var CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');

const handler = async (req, res) => {
  if (req.method == "POST") {
    let user = await User.findOne({ email: req.body.email });
    var bytes = CryptoJS.AES.decrypt(user.password, process.env.AES_SECRET);
    var decryptedData = bytes.toString(CryptoJS.enc.Utf8);

    if (user) {
      if (req.body.email == user.email && req.body.password == decryptedData) {
        var token = jwt.sign({ success: true, success: "Login successful." ,email:req.body.email},process.env.JWT_SECRET,{expiresIn:'2d'});
        res.status(200).json({token});
      } else {
        res.status(200).json({ success: false, error: "Inavalid credentials" });
      }
      // console.log(user);
    }
  } else {
    res.status(200).json({ success: false, error: "Some error has occured." });
  }
};

export default connectDb(handler);
