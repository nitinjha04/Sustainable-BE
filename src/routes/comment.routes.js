const express = require("express");
const { CommentController } = require("../controllers/comment.controllers");
const { Auth } = require("../middlewares/auth.middlewares");

const router = express.Router();

//get requests
router.get("/", CommentController.getById);

//post requests
router.post("/", [Auth], CommentController.create);

//put requests
router.delete("/:id", [Auth], CommentController.delete);

module.exports.CommentRouter = router;
