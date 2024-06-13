const mongoose = require("mongoose");

const url =
  "mongodb+srv://mladenovskipredrag:fspass@cluster0.dqtztu7.mongodb.net/testNoteApp?retryWrites=true&w=majority&appName=Cluster0";

mongoose.set("strictQuery", false);

mongoose
  .connect(url)
  .then(() => {
    console.info("connected to MongoDB TEST");
    saveNotes();
  })
  .catch((error) => {
    console.error("error connection to MongoDB TEST:", error.message);
  });

const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    minlength: 5,
  },
  important: Boolean,
});

noteSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Note = mongoose.model("Note", noteSchema);

const notes = [
  { content: "Learn Node.js", important: true },
  { content: "Build a REST API", important: false },
  { content: "Write some tests", important: true },
  { content: "Deploy the application", important: false },
];

function saveNotes() {
  notes.forEach((noteData) => {
    const note = new Note(noteData);

    note
      .save()
      .then((savedNote) => {
        console.log("Note saved:", savedNote);
      })
      .catch((error) => {
        console.error("Error saving note:", error.message);
      });
  });
}
