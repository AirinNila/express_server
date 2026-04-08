import express from "express";
import { todosControllers } from "./todos.controller";

const router = express.Router()

// routes -> controller --> service

router.post("/", todosControllers.createTodos)

// all Todos
router.get('/', todosControllers.getTodos)

// single todos Todos
router.get('/:id', todosControllers.getTodo)

// single todos update
router.put('/:id', todosControllers.updateTodo )

// delete todos 
router.delete('/:id', todosControllers.deleteTodo)

export const todosRoutes = router;