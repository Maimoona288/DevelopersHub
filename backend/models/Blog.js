const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String, // rich text (HTML from editor)
      required: true,
    },
    author: {
      type: String,
      default: "Admin",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);