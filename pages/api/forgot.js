import Forgot from "@/models/forgot";
import User from "@/models/user";
import connectDb from "../../middleware/mongoose";
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const handler = async (req, res) => {
  if (req.method == "POST") {
    let token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWNjZXNzIjoiTG9naW4gc3VjY2Vzc2Z1bC4iLCJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwiaWF0IjoxNjg3MzU5NjA0LCJleHAiOjE2ODc1MzI0MDR9.9plqJKuW-MFY8S3EIYL5e9iGkE3zpO-S3d3DQhv3fzQ`;
    if (req.body.sendmail) {
      let forgot = new Forgot({
        email: req.body.email,
        token: token,
      });
      let email = `We have sent you this email in response to your request to reset your password on Shopify.

    To reset your password, please follow the link below:

    <a href="http://codeswear.com/forgot?token=${token}">Click here to reset the password</a>
    
    <br/><br/>

    We recommend that you keep your password secure and not share it with anyone.If you feel your password has been compromised, you can change it by going to your Shopify's My Account Page and clicking on the "Security" option for changing the password.
    
    <br/><br/>`;
    } else {
      // Change or reset the password.
    }
    res.status(200).json({ success: true, token: token });
  } else {
    res.status(400).json({ error: true, error: "error" });
  }
}
export default connectDb(handler);