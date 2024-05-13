import { Todo } from '../modals/todoModals.js';

const createTodo = async (req, res) => {
  const { description, date, title } = req.body;

  try {
    const todo = await Todo.create({
      user: req.user.id,
      description,
      title,
      date,
    });
    if (todo) {
      res.status(201).json(todo);
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: error,
    });
  }
};

const GetTodo = async (req, res) => {
  try {
    const todo = await Todo.find({})
      .populate('user', 'username')
      .sort({ createdAt: -1 });
    res.status(201).json(todo);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: `Une erreur s'est produite`,
    });
  }
};

const deleteTodo = async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.status(201).json({
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateTodo = async (req, res) => {
  const { description, image, title, date } = req.body;
  try {
    await Todo.findByIdAndUpdate(
      req.params.id,
      {
        description,
        image,
        title,
        date,
      },
      { new: true }
    );
    res.status(201).json({
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export { deleteTodo, GetTodo, createTodo, updateTodo };
