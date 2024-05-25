import AddTaskInputForm from "./AddTaskInputForm";

function AddTask({
	dispatch,
	setIsLoading,
	isLoading,
	isFormHide,
	setIsFormHide,
}) {
	return (
		<>
			<div className="flex justify-center">
				<AddTaskInputForm
					isFormHide={isFormHide}
					setIsFormHide={setIsFormHide}
					setIsLoading={setIsLoading}
					dispatch={dispatch}
				/>
				<button
					onClick={() => setIsFormHide(false)}
					className=" bg-green-500 border-2 border-solid border-black rounded-md p-1 hover:bg-green-300"
				>
					Add Task
				</button>
			</div>
		</>
	);
}

export default AddTask;
