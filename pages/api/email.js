// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import connectDb from "../../middleware/mongoose";
// import User from "../../models/user";
var jwt = require('jsonwebtoken');

const handler = async (req, res) => {
  if (req.method == "POST") {
    var decoded = jwt.verify(req.body.token, process.env.JWT_SECRET);
    res.status(200).json(decoded.email)
  }
};

export default connectDb(handler);
