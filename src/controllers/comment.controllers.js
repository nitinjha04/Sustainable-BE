const HttpError = require("../helpers/HttpError.helpers");
const Response = require("../helpers/Response.helpers");
const { CommentService } = require("../services/comment.service");
const { ContentService } = require("../services/content.service");

class CommentController {
  create = async (req, res) => {
    try {
      const comment = await CommentService.create({ ...req.body });

      const content = await ContentService.findById(req.body.contentId);
      console.log({ content });
      const allComments = await CommentService.find({
        contentId: req.body.contentId,
      });

      console.log({ allComments });
      const totalRatings = allComments.reduce(
        (sum, comment) => sum + comment.rating,
        0
      );
      const averageRating = allComments.length
        ? totalRatings / allComments.length
        : 0;

      console.log({ averageRating });
      await ContentService.findByIdAndUpdate(content._id, {
        rating: averageRating.toPrecision(),
        $push: { comments: comment._id },
      });

      Response(res).body(comment).send();
    } catch (error) {
      console.error(error);
      throw new HttpError(500, "Internal Server Error");
    }
  };

  getById = async (req, res) => {
    const { id } = req.params;

    try {
      const comments = await CommentService.findById(id);
      Response(res).body(comments).send();
    } catch (error) {
      console.error(error);
      throw new HttpError(500, "Internal Server Error");
    }
  };

  delete = async (req, res) => {
    const { id } = req.params;

    if (!id) {
      throw new HttpError(400, "Comment ID is required in the request body");
    }

    try {
      await CommentService.findByIdAndDelete(id);
      // await CommentService.removeCommentFromPost(id);

      Response(res).body({ deletedCommentId: id }).send();
    } catch (error) {
      console.error(error);
      throw new HttpError(500, "Internal Server Error");
    }
  };
}

module.exports.CommentController = new CommentController();
