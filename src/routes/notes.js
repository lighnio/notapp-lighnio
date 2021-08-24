const router = require("express").Router();

const Note = require("../models/Note");
router.get("/notes/add", (req, res) => {
  res.render("notes/new-note");
});

router.post("/notes/new-note", async (req, res) => {
  const { title, description } = req.body;
  const errors = [];
  if (!title.trim()) errors.push({ text: "Title can't be empty." });
  if (!description.trim()) errors.push({ text: "Description can't be empty." });

  if (errors.length > 0) {
    res.render("notes/new-note", {
      errors,
      title,
      description,
    });
  } else {
    const newNote = new Note({ title, description });
    await newNote.save();
    req.flash('success_msg', "Note added successfully");
    res.redirect("/notes");
  }
});

// router.get("/notes", async (req, res) => {
//   const notes = await Note.find();
//   console.log(notes);
//   res.render('notes/all-notes', { notes });
// });

router.get("/notes", async (req, res) => {
  await Note.find()
    .sort({ date: "desc" })
    .then((docs) => {
      // console.log(docs);
      const context = {
        notes: docs.map((doc) => {
          return {
            id: doc._id,
            title: doc.title,
            description: doc.description,
          };
        }),
      };
      // console.log(context.notes);
      res.render("notes/all-notes", { notes: context.notes });
    });
});

router.get("/notes/edit/:id", async (req, res) => {
  const note = await Note.findById(req.params.id);
  const data = {
    id: note._id,
    title: note.title,
    description: note.description
  }
  // console.log(data);
  res.render("notes/edit-note", { data: data });
});

router.put('/notes/edit-note/:id', async(req, res) => {
    const {title, description} = req.body;
    await Note.findByIdAndUpdate(req.params.id, {title, description});
    req.flash('success_msg', 'Note updated successfully');
    res.redirect('/notes');
});

router.delete('/notes/delete/:id', async(req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  req.flash('success_msg', 'Note deleted successfully');
  res.redirect('/notes');
})

module.exports = router;
