// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectDb from "../../middleware/mongoose";
import Order from "../../models/order";

const handler = async (req, res) => {
  let order_ID = Math.floor(Math.random() * Date.now());
  let order = await Order.findOneAndUpdate(
    { orderId: ORDERID },
    { status: "paid" }
  );
  res.status(200).json({ body: req.body });
};
