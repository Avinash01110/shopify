import connectDb from "../../middleware/mongoose";
import User from "../../models/user";
var CryptoJS = require("crypto-js");
var jwt = require("jsonwebtoken");

const handler = async (req, res) => {
  if (req.method == "POST") {
    var user = jwt.verify(req.body.token, process.env.JWT_SECRET);
    let dbuser = await User.findOne({email:user.email})
    var bytes = CryptoJS.AES.decrypt(dbuser.password, process.env.AES_SECRET);
    var decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    if(decryptedData == req.body.oldPassword && req.body.newPassword == req.body.confirmPassword){
        let dbuser = await User.findOneAndUpdate({email:user.email},{password: CryptoJS.AES.encrypt(req.body.confirmPassword, process.env.AES_SECRET).toString()})
        res.status(200).json({ success:true, success:"Password has changed" });
    }else if(decryptedData != req.body.oldPassword ){
        res.status(400).json({ error: true,error:"Old password doesnot match" });
    }else if(decryptedData == req.body.oldPassword && req.body.newPassword != req.body.confirmPassword){
        res.status(400).json({ error: true , error: "New & Confirm Password may differ"});
    }
    else{
        res.status(400).json({ error: true, error: "error"});
    }
  }
};
export default connectDb(handler);
