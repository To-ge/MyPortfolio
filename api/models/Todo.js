const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    merit: { type: Array, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Todo", TodoSchema);
