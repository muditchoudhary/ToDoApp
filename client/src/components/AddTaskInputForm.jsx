import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function AddTaskInputForm({ isFormHide, setIsFormHide, setIsLoading, dispatch }) {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [dueDate, setDueDate] = useState("");

	const onCancel = () => {
		setIsFormHide(true);
		setTitle("");
		setDescription("");
		setDueDate("");
	};

	const onDone = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			const response = await axios.post("http://localhost:3000/tasks/", {
				title: title,
				description: description,
				dueDate: dueDate,
			});
			if (response.status === 200) {
				dispatch({ type: "add", payload: response.data.task });
				toast.success("Task added successfully!");
				onCancel();
			}
		} catch (error) {
			console.error("There is some error ", error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			{!isFormHide && (
				<div className="fixed top-0 left-0 border-2 border-solid border-black flex bg-black bg-opacity-80 justify-center items-center w-full h-full">
					<div className=" w-1/2 border-2 border-green-500 border-solid py-4 px-2 bg-green-500 bg-opacity-80">
						<h2 className=" text-3xl">Add a Task: </h2>
						<hr />
						<form
							className="flex flex-col gap-y-5 py-3 px-4"
							onSubmit={onDone}
						>
							<div>
								<label className="text-xl" htmlFor="title">
									Title:{" "}
								</label>
								<input
									className="text-xl border border-solid border-gray-500 flex-1 p-1"
									placeholder="Task Title"
									id="title"
									name="title"
									value={title}
									onChange={(e) => setTitle(e.target.value)}
									required
								/>
							</div>
							<div>
								<label
									className="text-xl"
									htmlFor="description"
								>
									Description:{" "}
								</label>
								<input
									placeholder="Task Title"
									id="description"
									name="description"
									className="text-xl border border-solid border-gray-500 flex-1 p-1"
									value={description}
									onChange={(e) =>
										setDescription(e.target.value)
									}
									required
								/>
							</div>
							<div>
								<label className="text-xl" htmlFor="date">
									Due Date:{" "}
								</label>
								<input
									type="date"
									placeholder="Enter Due Date"
									id="date"
									name="date"
									className="text-xl border border-solid border-gray-500 flex-1 p-1"
									value={dueDate}
									onChange={(e) => setDueDate(e.target.value)}
									required
								/>
							</div>
							<div className="flex justify-between">
								<button
									onClick={onCancel}
									className="bg-red-500 border-2 border-solid border-black rounded-md p-1 hover:bg-red-300"
								>
									Cancel
								</button>
								<button
									type="submit"
									className="bg-green-500 border-2 border-solid border-black rounded-md p-1 hover:bg-green-300"
								>
									Done
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</>
	);
}

export default AddTaskInputForm;
