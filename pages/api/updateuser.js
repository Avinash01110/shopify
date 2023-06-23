// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import connectDb from "../../middleware/mongoose";
import User from "../../models/user";
var jwt = require("jsonwebtoken");

const handler = async (req, res) => {
  if (req.method == "POST") {
    var user = jwt.verify(req.body.token, process.env.JWT_SECRET);
    let dbuser = await User.findOneAndUpdate(
      { email: user.email },
      {
        name: req.body.name,
        phone: req.body.phone,
        address: req.body.address,
        pincode: req.body.pincode,
      }
    );
    res.status(200).json({ success: true, user: dbuser });
  } else {
    res.status(400).json({error:true,error:"error!!"});
  }
};

export default connectDb(handler);
