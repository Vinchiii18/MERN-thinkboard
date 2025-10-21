import mongoose from "mongoose";

// 1. Create a schema
// 2. Create a model using the schema

const noteSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
    }, 
    {timestamps: true} // automatically create createdAt and updatedAt fields
);

const Note = mongoose.model("Note", noteSchema);

export default Note;