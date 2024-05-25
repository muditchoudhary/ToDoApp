const taskReducer = (state, action) => {
	switch (action.type) {
		case "add":
			return [...state, action.payload];
		case "delete":
			return state.filter((task) => {
				if (task.id !== action.payload.id) return task;
			});
		case "edit":
			return state.map((task) => {
				if (task.id === action.payload.id) {
					return action.payload.task;
				} else {
					return task;
				}
			});
		case "initialize":
			return action.payload;
	}
};

export default taskReducer;
