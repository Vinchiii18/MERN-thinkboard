import Note from '../models/Notes.js';

export async function getAllNotes(_, res) {
    try {
        const notes = await Note.find().sort({createdAt: 1}); // -1 for descending order
        res.status(200).json(notes);
    } 
    catch (error) {
        handleError(res, 500, "getAllNotes");
    }
}

export async function getNoteById(req, res) {
    try {
        const note = await Note.findById(req.params.id);
        if(!note) return res.status(404).json({message: "Note id not found"});
        res.status(200).json(note);
    } 
    catch (error) {
        handleError(res, 500, "getNoteById");
    }
}

export async function createNote(req, res) {
    try {
        const {title, content} = req.body;
        const note = new Note({ title, content });

        const savedNote = await note.save();
        res.status(201).json(savedNote);
    } catch (error) {
        handleError(res, 500, "createNote");
    }
};

export async function updateNote(req, res) {
    try {
        const {title, content} = req.body;
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, {title, content}, {new: true});

        if(!updatedNote) return res.status(404).json({message: "Note not found"});

        return res.status(200).send(updatedNote);
    } catch (error) {
        handleError(res, 500, "updateNote");
    }
};

export async function deleteNote(req, res) {
    try {
        // const {id} = req.params;
        const deletedNote = await Note.findByIdAndDelete(req.params.id);

        if(!deletedNote) return res.status(404).json({message: "Note not found! Deletion failed."});

        res.json({message: "Note deleted successfully"});
    } catch (error) {
        handleError(res, 500, "deleteNote");
    }

};

function handleError(res, error, route) {
    console.error(`Error in ${route}:`, error);
    res.status(500).json({message: `Error in ${route} controller`, error: error.message});
}