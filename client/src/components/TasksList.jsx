import Task from "./Task";
function TasksList({
	tasks,
	currentTask,
	setCurrentTask,
	setIsEditFormHide,
	setIsLoading,
    dispatch,
    setShowDescription
}) {
	return (
		<>
			<div className="border-2 border-solid flex flex-col border-black gap-y-5 p-4 mt-4">
				{tasks.map((task) => (
					<Task
						key={task.id}
						task={task}
						setCurrentTask={setCurrentTask}
						setIsEditFormHide={setIsEditFormHide}
						setIsLoading={setIsLoading}
                        dispatch={dispatch}
                        setShowDescription={setShowDescription}
					/>
				))}
			</div>
		</>
	);
}

export default TasksList;
