// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import connectDb from "../../middleware/mongoose";
import Product from "../../models/product";

const handler = async (req, res) => {
  let products = await Product.find();
  let furniture = {};
  for (let item of products) {
    if (item.title in furniture) {
      if (
        !furniture[item.title].color.includes(item.color) &&
        item.availableqty > 0
      ) {
        furniture[item.title].color.push(item.color);
      }
      if (
        !furniture[item.title].size.includes(item.size) &&
        item.availableqty > 0
      ) {
        furniture[item.title].size.push(item.size);
      }
    }else {
      furniture[item.title] = JSON.parse(JSON.stringify(item));
      if (item.availableqty > 0) {
        furniture[item.title].color = [item.color];
        furniture[item.title].size = [item.size];
      }
    }
  }
  res.status(200).json({ furniture });
};

export default connectDb(handler);
