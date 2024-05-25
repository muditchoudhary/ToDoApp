import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function Task({
	task,
	setCurrentTask,
	setIsEditFormHide,
	setIsLoading,
	dispatch,
	setShowDescription,
}) {
	const [isTaskChecked, setIsTaskChecked] = useState(false);
	const onEdit = () => {
		setIsEditFormHide(false);
		setCurrentTask(task);
	};

	const onDelete = async () => {
		setIsLoading(true);
		try {
			const response = await axios.delete(
				`http://localhost:3000/tasks/${task.id}`
			);
			if (response.status === 200) {
				dispatch({
					type: "delete",
					payload: { id: task.id },
				});
				toast.success("Task deleted successfully!");
			}
		} catch (error) {
			console.error("There is some error ", error);
		} finally {
			setIsLoading(false);
		}
	};

	const onCheck = async (checked) => {
		setIsLoading(true);
		try {
			const updatedTask = {
				title: task.title,
				description: task.description,
				status: checked ? "completed" : "pending",
				dueDate: task.dueDate,
			};
			const response = await axios.put(
				`http://localhost:3000/tasks/${task.id}`,
				updatedTask
			);
			if (response.status === 200) {
				dispatch({
					type: "edit",
					payload: { id: task.id, task: response.data.task },
				});
				toast.success(
					`Task mark as ${checked ? "Completed" : "Pending"}`
				);
				setIsTaskChecked(checked);
			}
		} catch (error) {
			console.error("There is some error ", error);
		} finally {
			setIsLoading(false);
		}
	};

	const onShowDescription = () => {
		setShowDescription(true);
		setCurrentTask(task);
	};

	useEffect(() => {
		const checked = task.status === "pending" ? false : true;
		setIsTaskChecked(checked);
	}, []);
	return (
		<>
			<div className="flex p-2 border-b-2 border-black border-solid">
				<div className="flex gap-x-3 items-center py-2 flex-1">
					<div>
						<input
							type="checkbox"
							checked={isTaskChecked}
							onChange={(e) => onCheck(e.target.checked)}
							required
						/>
					</div>
					<div className=" w-full overflow-x-scroll">
						{task.title}
					</div>
				</div>
				<div className="flex gap-x-2">
					{task.status === "pending" && (
						<p className="bg-orange-400 border-2 border-solid border-orange-400 rounded-md p-1">
							Pending
						</p>
					)}
					{task.status === "completed" && (
						<p className="bg-green-500 border-2 border-solid border-green-500 rounded-md p-1">
							Completed
						</p>
					)}
					<button onClick={onShowDescription} className="bg-yellow-500 border-2 border-solid border-yellow-500 rounded-md p-1 hover:bg-yellow-300">
						Description
					</button>
					<button
						onClick={onDelete}
						className="bg-red-500 border-2 border-solid border-red-500 rounded-md p-1 hover:bg-red-300"
					>
						Del
					</button>
					<button
						onClick={onEdit}
						className="bg-blue-500 border-2 border-solid border-blue-500 rounded-md p-1 hover:bg-blue-300"
					>
						Edit
					</button>
				</div>
			</div>
		</>
	);
}

export default Task;
