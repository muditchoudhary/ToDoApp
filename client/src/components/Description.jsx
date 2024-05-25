function Description({ showDescription, currentTask, setShowDescription }) {
	const onClose = () => {
		setShowDescription(false);
	};
	return (
		<>
			{showDescription && (
				<div className="fixed top-0 left-0 border-2 border-solid border-black bg-black bg-opacity-80 flex justify-center items-center w-full h-full">
					<div className="flex flex-col gap-y-3">
						<p className=" text-2xl text-white">{currentTask.description}</p>

						<button
							onClick={onClose}
							className="bg-red-500 border-2 border-solid border-black rounded-md p-1 hover:bg-red-300"
						>
							Close
						</button>
					</div>
				</div>
			)}
		</>
	);
}

export default Description;
