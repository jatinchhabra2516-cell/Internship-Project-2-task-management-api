const express = require("express");
const app = express();

app.use(express.json());

let tasks = [
  {
    id: 1,
    title: "Complete Internship Project",
    status: "Pending"
  }
];

// GET all tasks
app.get("/tasks", (req, res) => {
  res.status(200).json(tasks);
});

// GET single task
app.get("/tasks/:id", (req, res) => {
  const task = tasks.find(
    t => t.id === parseInt(req.params.id)
  );

  if (!task) {
    return res.status(404).json({
      message: "Task not found"
    });
  }

  res.status(200).json(task);
});

// POST new task
app.post("/tasks", (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({
      message: "Title is required"
    });
  }

  const newTask = {
    id: tasks.length + 1,
    title,
    status: "Pending"
  };

  tasks.push(newTask);

  res.status(201).json({
    message: "Task created successfully",
    task: newTask
  });
});

// PUT update task
app.put("/tasks/:id", (req, res) => {
  const task = tasks.find(
    t => t.id === parseInt(req.params.id)
  );

  if (!task) {
    return res.status(404).json({
      message: "Task not found"
    });
  }

  task.title = req.body.title || task.title;
  task.status = req.body.status || task.status;

  res.status(200).json({
    message: "Task updated successfully",
    task
  });
});

// DELETE task
app.delete("/tasks/:id", (req, res) => {
  const index = tasks.findIndex(
    t => t.id === parseInt(req.params.id)
  );

  if (index === -1) {
    return res.status(404).json({
      message: "Task not found"
    });
  }

  tasks.splice(index, 1);

  res.status(200).json({
    message: "Task deleted successfully"
  });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});