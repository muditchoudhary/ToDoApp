const express = require("express");
const redis = require("redis");

const TasksController = require("./controllers/tasks.controller");

const app = express();
app.use(express.json());

const { createTask, getTask, getTasks, deleteTask, updateTask } =
	TasksController();

app.get("/", (request, response) => {
	response.send("<h1>Hello World!</h1>");
});

app.get("/tasks/:id", getTask);
app.post("/tasks", createTask);
app.get("/tasks", getTasks);
app.delete("/tasks/:id", deleteTask);
app.put("/tasks/:id", updateTask);

const PORT = 3000;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
