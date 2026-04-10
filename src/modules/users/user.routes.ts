import express from "express";
import { userControllers } from "./user.controller";
import auth from "../../middleware/auth";
import { logger } from "../../middleware/logger";

const router = express.Router()

// routes -> controller --> service

router.post("/", userControllers.createUser)

// all users
router.get('/', logger, auth(), userControllers.getUsers)

// single user users
router.get('/:id', userControllers.getUser)

// single user update
router.put('/:id', userControllers.updateUser )

// delete user 
router.delete('/:id', userControllers.deleteUser)

export const userRoutes = router;