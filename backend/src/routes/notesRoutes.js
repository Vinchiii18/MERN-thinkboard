import express from "express"; // ES6 Modules, must add "type": "module" in package.json
// const express = require('express'); // CommonJS, must remove "type": "module" in package.json
import { createNote, deleteNote, getAllNotes, getNoteById, updateNote } from '../controllers/notesController.js';

const router = express.Router();

router.get("/", getAllNotes);
router.get("/:id", getNoteById);
router.post("/", createNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

export default router;