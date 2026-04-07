import express from "express";
import { Request, Response } from 'express';
import { pool } from "../../config/db";
import { userControllers } from "./user.controller";

const router = express.Router()

// routes -> controller --> service

router.post("/", userControllers.createUser)

// all users
router.get('/', userControllers.getUsers)

// single user users
router.get('/:id', userControllers.getUser)

// single user update
router.put('/:id', userControllers.updateUser )

// delete user 
router.delete('/:id', userControllers.deleteUser)

export const userRoutes = router;