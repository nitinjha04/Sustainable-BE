const { Comment } = require("../models/Comment.modal");
const { Content } = require("../models/Content.modal");

const BasicServices = require("./basic.service");

class CommentService extends BasicServices {
  constructor() {
    super(Comment);
  }

  // removeCommentFromPost = async (commentId) => {
  //   try {
  //     await Content.updateOne(
  //       { comments: commentId },
  //       { $pull: { comments: commentId } }
  //     ).exec();
  //   } catch (error) {
  //     console.error("Error removing comment from post:", error);
  //     throw new Error("Error removing comment from post");
  //   }
  // };
}

module.exports.CommentService = new CommentService();
