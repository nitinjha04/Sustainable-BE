const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    type: {
      enum: ["PRODUCT", "TIP", "ARTICLE"],
      type: String,
      required: true,
    },
    likedIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    thumbnail: {
      type: String,
    },
    category: {
      type: String,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    tips: [
      {
        content: {
          type: String,
        },
      },
    ],
    description: {
      type: String,
      required: true,
    },
    pros: [
      {
        type: String,
      },
    ],
    cons: [
      {
        type: String,
      },
    ],
    productLink: {
      type: String,
    },
    price: {
      type: Number,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

exports.Content = mongoose.model("Content", Schema);
