const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    token: { type: String, required: true}
  },
  { timestamps: true }
);

mongoose.models={}
export default mongoose.model("user", userSchema);
