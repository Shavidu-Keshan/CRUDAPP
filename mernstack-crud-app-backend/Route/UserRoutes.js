const express = require("express");
const router = express.Router();

//insert models
const User = require("../Model/UserModel");
//insert user controllers
const UserController = require("../controllers/UserControllers");

router.get("/",UserController.getAllUsers);
router.post("/",UserController.addUsers);
router.get("/:id",UserController.getById);
router.put("/:id",UserController.updateUser);
router.delete("/:id",UserController.deleteUser);

//exports
module.exports = router;
