import { useEffect, useReducer, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

import AddTask from "./AddTask";
import taskReducer from "./TasksReucer";
import Loader from "./Loader";
import TasksList from "./TasksList";
import axios from "axios";
import EditTaskInputForm from "./EditTaskInputForm";
import Description from "./Description";

function Home() {
	const [isLoading, setIsLoading] = useState(false);
	const [state, dispatch] = useReducer(taskReducer, []);
	const [isFormHide, setIsFormHide] = useState(true);
	const [isEditFormHide, setIsEditFormHide] = useState(true);
	const [currentTask, setCurrentTask] = useState({});
	const [showDescription, setShowDescription] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		async function getTasks() {
			const response = await axios.get("http://localhost:3000/tasks/");
			if (response.status === 200) {
				dispatch({ type: "initialize", payload: response.data.tasks });
			}
			setIsLoading(false);
		}
		getTasks().then(toast.success("Tasks synced successfully!!"));
	}, []);
	return (
		<>
			<div className="h-full flex flex-col items-center">
				<EditTaskInputForm
					isEditFormHide={isEditFormHide}
					setIsEditFormHide={setIsEditFormHide}
					setIsLoading={setIsLoading}
					dispatch={dispatch}
					currentTask={currentTask}
				/>
				<div className=" w-3/4 mt-5">
					<h2 className=" text-center text-4xl mb-6">My To Dos: </h2>
					<AddTask
						dispatch={dispatch}
						setIsLoading={setIsLoading}
						isLoading={isLoading}
						isFormHide={isFormHide}
						setIsFormHide={setIsFormHide}
					/>
					<TasksList
						tasks={state}
						currentTask={currentTask}
						setCurrentTask={setCurrentTask}
						setIsEditFormHide={setIsEditFormHide}
						setIsLoading={setIsLoading}
						dispatch={dispatch}
                        setShowDescription={setShowDescription}
					/>
				</div>
				<ToastContainer />
				<Description
					showDescription={showDescription}
					currentTask={currentTask}
                    setShowDescription={setShowDescription}
				/>
				<Loader isLoading={isLoading} />
			</div>
		</>
	);
}

export default Home;
