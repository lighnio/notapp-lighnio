const router = require("express").Router();

const Note = require("../models/Note");
router.get("/notes/add", (req, res) => {
  res.render("notes/new-note");
});

router.post("/notes/new-note", async (req, res) => {
  const { title, description } = req.body;
  const errors = [];
  if (!title.trim()) errors.push({ text: "Title don't be empty." });
  if (!description.trim()) errors.push({ text: "Description don't be empty." });

  if (errors.length > 0) {
    res.render("notes/new-note", {
      errors,
      title,
      description,
    });
  } else {
    const newNote = new Note({ title, description });
    await newNote.save();
    res.redirect("/notes");
  }
});

// router.get("/notes", async (req, res) => {
//   const notes = await Note.find();
//   console.log(notes);
//   res.render('notes/all-notes', { notes });
// });

router.get('/notes', async (req, res) => {
  await Note.find()
    .then( docs => {
      const context = {
        notes: docs.map(doc => {
          return {
            title: doc.title,
            description: doc.description
          }
        })
      }
      res.render('notes/all-notes', {notes: context.notes});
    })
});

module.exports = router;
