const HttpError = require("../helpers/HttpError.helpers");
const Response = require("../helpers/Response.helpers");
const { CommentService } = require("../services/comment.service");
const { ContentService } = require("../services/content.service");

class ContentController {
  create = async (req, res) => {
    const content = await ContentService.create({ ...req.body });
    Response(res).body(content).send();
  };
  getAll = async (req, res) => {
    const { category, type } = req.query;
    const filter = {};

    if (category) filter.category = category;

    if (type) filter.type = type;

    const content = await ContentService.find(filter).sort({ createdAt: -1 });

    Response(res).body(content).send();
  };
  getById = async (req, res) => {
    const content = await ContentService.findById(req.params.id)
      .populate({
        path: "authorId",
        select: "name role thumbnail",
      })
      .populate({
        path: "comments",
        select: "rating user _id contentId body",
      })
      .select("-__v");
    Response(res).body(content).send();
  };
  update = async (req, res) => {
    const { id, liked, userId, ...otherFields } = req.body;
    let updateQuery = { ...otherFields };

    if (liked) {
      updateQuery = {
        $addToSet: { likedIds: userId },
      };
    } else if (!liked) {
      updateQuery = {
        $pull: { likedIds: userId },
      };
    }

    const content = await ContentService.findByIdAndUpdate(
      id,
      {
        ...updateQuery,
      },
      { new: true }
    );
    if (!content) {
      return res.status(404).json({ message: " not found" });
    }

    Response(res).body(content).send();
  };
  like = async (req, res) => {
    const { id, likedIds } = req.body;

    try {
      const updateQuery = {
        $set: { likedIds: likedIds },
      };

      const content = await ContentService.findByIdAndUpdate(
        id,
        {
          ...updateQuery,
        },
        { new: true }
      );

      Response(res).body(content).send();
    } catch (error) {
      console.error("Error updating content:", error);
      res.status(500).json({ message: "Server error" });
    }
  };

  delete = async (req, res) => {
    const content = await ContentService.findByIdAndDelete(req.params.id);
    Response(res).body(content).send();
  };
}

module.exports.ContentController = new ContentController();
