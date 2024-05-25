const { response } = require("express");
const redis = require("redis");
const uuid = require("uuid");

const TasksController = () => {
	const getTasks = async (req, res) => {
		try {
			const client = redis.createClient();
			await client.connect();
			// Getting all the tasks keys
			const todosKeys = await client.lRange("todos", 0, -1);
			// Getting task object and storing in a list
			const todosList = await Promise.all(
				todosKeys.map(async (key) => {
					const todo = await client.hGetAll(key);
					return todo;
				})
			);
			console.log(todosKeys);
			client.disconnect();

			return res
				.status(200)
				.json({ response: "success", tasks: todosList });
		} catch (error) {
			console.error(error);
			return res.status(500).json({
				response: "failure",
				message: "Internal sever error",
			});
		}
	};

	const getTask = async (req, res) => {
		try {
			const client = redis.createClient();
			await client.connect();

			const id = req.params.id;

			// Getting the task with its id
			const task = await client.hGetAll(`todo:${id}`);

			if (!task || Object.keys(task).length === 0) {
				return res
					.status(400)
					.json({ response: "failure", message: "task not found" });
			}
			client.disconnect();
			return res.status(200).json({ response: "success", task: task });
		} catch (error) {
			return res
				.status(500)
				.json({ response: "failure", message: "Internal sever error" });
		}
	};

	const createTask = async (req, res) => {
		try {
			const client = redis.createClient();
			await client.connect();

			const body = req.body;
			if (!body) {
				return response.status(400).json({ error: "data missing" });
			}

			const id = uuid.v4();

			const task = {
				id: id,
				title: body.title,
				description: body.description || "",
				status: body.status,
				dueDate: body.dueDate,
			};

			// Create a task key and set value the task
			await client.hSet(`todo:${task.id}`, task);

			// Push the task in a seperate key for retrieval
			await client.rPush("todos", `todo:${id}`);
			client.disconnect();
			return res.status(200).json({
				response: "success",
				message: "Task has been created",
			});
		} catch (error) {
			return res
				.status(500)
				.json({ response: "failure", message: "Internal sever error" });
		}
	};

	const updateTask = async (req, res) => {
		try {
			const client = redis.createClient();
			await client.connect();
			const id = req.params.id;

			const key = `todo:${id}`;
            const body = req.body;

            // Getting all the tasks keys
			const todosKeys = await client.lRange("todos", 0, -1);
            if (todosKeys.length === 0) {
                return res.status(400).json({response: "failure", message: "tasks do not exist"});
            }

            // Checking if a key exits or not
            const keyExits = await client.exists(key);
            if (keyExits === 0) {
                return res.status(400).json({response: "failure", message: "task does not exist"});
            }

			const task = {
				id: id,
				title: body.title,
				description: body.description || "",
				status: body.status,
				dueDate: body.dueDate,
			};

			await client.hSet(key, task);

			client.disconnect();
			return res.status(200).json({
				response: "success",
				message: "Task has been updated",
			});
		} catch (error) {
			console.error(error);
			return res.status(500).json({
				response: "failure",
				message: "Internal sever error",
			});
		}
	};

	const deleteTask = async (req, res) => {
		try {
			const client = redis.createClient();
			await client.connect();

			const id = req.params.id;
			const key = `todo:${id}`;
			const result = await client.del(key);
			if (result === 0) {
				return res
					.status(400)
					.json({ response: "failure", message: "no task found" });
			}
			await client.lRem("todos", 1, key);
			client.disconnect();
			return res.status(200).json({
				response: "success",
				message: "task has been deleted",
			});
		} catch (error) {
			console.error(error);
			return res.status(500).json({
				response: "failure",
				message: "Internal sever error",
			});
		}
	};

	return { getTask, getTasks, createTask, updateTask, deleteTask };
};

module.exports = TasksController;
