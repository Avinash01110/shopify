// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectDb from "../../middleware/mongoose";
import Order from "../../models/order";
import jwt from "jsonwebtoken"

const jsonwebtoken = require("jsonwebtoken")

const handler = async (req, res) => {
  const token = req.body.token;
  const data = jwt.verify(token, "iampro");
  let orders = await Order.find({ email: data.email });

  res.status(200).json({ orders});
};

export default connectDb(handler);
