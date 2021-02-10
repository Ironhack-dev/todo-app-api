// TODO CRUD
const express = require('express');
const Todo = require('../../models/Todo');
const router = express.Router();

router.get('/', (req, res, next) => {
  Todo.find()
  .then(todos => res.status(200).json(todos))
  .catch(err => res.status(500).json(err))
})

router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  Todo.findOne({ id })
  .then(todo => res.status(200).json(todo))
  .catch(err => res.status(500).json(err))
})

router.post('/', (req, res, next) => {
  const { name, description, dueDate, priority } = req.body;

  if(!name) {
    return res.status(400).json({ message: 'Name is required'})
  }

  const newTodo = new Todo({
    name,
    description,
    dueDate: dueDate || Date.now,
    priority,
    user: req.user
  })

  newTodo.save()
  .then(todo => {
    return res.status(200).json(todo)
  })
  .catch(err => res.status(500).json(err))
})

router.put('/:id', (req, res, next) => {
  const { id } = req.params;

  Todo.findOneAndUpdate({ id }, req.body, { new: true })
  .then(todo => {
    return res.status(200).json(todo);
  })
  .catch(err => res.status(500).json(err))
})

router.delete('/:id', (req, res, next) => {
  const { id } = req.params;
  Todo.findOneAndRemove({ id })
  .then(() => res.status(200).json({ message: `Todo ${id} deleted 🗑`}))
  .catch(err => res.status(500).json(err))
})


module.exports = router;
