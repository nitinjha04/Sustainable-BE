const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
  {
    body: {
      type: String,
      required: true,
      maxLength: 280,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
    },
    user: {
      type: {
        _id: {
          type: mongoose.Schema.Types.ObjectId, 
          ref: "User",
        },
        name: {
          type: String,
        },
        thumbnail: {
          type: String,
        },
        email: {
          type: String,
        },
        role: {
          type: String,
        },
      },
      required: true, // Optional: Add if user details are required
    },
    contentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Content",
    },
  },
  {
    timestamps: true,
  }
);

exports.Comment = mongoose.model("Comment", Schema);
