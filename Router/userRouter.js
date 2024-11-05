import express from "express";
import userController from "../Controller/user.js";
import postController from "../Controller/post.js";
const router = express.Router();


router.get("/list", userController.getList);
router.post("/create", userController.createUser)
router.post('/login', userController.loginUser);
router.post('/posts', postController.createPost);
router.put('/posts/:id', postController.updatePost);


export default router;
