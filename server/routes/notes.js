
const express = require('express');
const Note = require('../models/Note');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', protect, async (req, res) => {
  const notes = await Note.find({ user: req.user._id });
  res.json(notes);
});

router.post('/', protect, async (req, res) => {
  const note = await Note.create({
    user: req.user._id,
    title: req.body.title,
    content: req.body.content
  });
  res.status(201).json(note);
});

router.put('/:id', protect, async (req, res) => {
  const note = await Note.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    { title: req.body.title, content: req.body.content },
    { new: true }
  );
  res.json(note);
});

router.delete('/:id', protect, async (req, res) => {
  await Note.findOneAndDelete({ _id: req.params.id, user: req.user._id });
  res.json({ message: 'Note deleted' });
});

module.exports = router;
