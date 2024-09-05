const express = require("express");
const { ContentController } = require("../controllers/content.controllers");
const { Auth } = require("../middlewares/auth.middlewares");

const router = express.Router();

//get requests
router.get("/", ContentController.getAll);
router.get("/own", [Auth], ContentController.getOwn);
router.get("/:id", ContentController.getById);

//post requests
router.post("/", ContentController.create);
router.post("/like", [Auth], ContentController.like);
router.put("/:id", [Auth], ContentController.update);

//put requests
router.delete("/:id", [Auth], ContentController.delete);

module.exports.ContentRouter = router;
