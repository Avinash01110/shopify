// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import connectDb from "../../middleware/mongoose";
import Product from "../../models/product";

const handler = async (req, res) => {
  if (req.method == "POST") {
    for (let i = 0; i < req.body.length; i++) {
      let p = new Product({
        title: req.body[i].title,
        slug: req.body[i].slug,
        desc: req.body[i].description,
        img: req.body[i].imageUrl,
        category: req.body[i].category,
        price: req.body[i].price,
        size: req.body[i].size,
        color: req.body[i].color,
        availableqty: req.body[i].availableQty,
      });
      await p.save();
    }
    res.status(200).json({success:true, success: "Product has been added to database" });
  } else {
    res.status(400).json({error:true, error: "Some error occured while adding the product" });
  }
};

export default connectDb(handler);
