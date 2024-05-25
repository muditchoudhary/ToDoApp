import { Oval } from "react-loader-spinner";
function Loader({ isLoading }) {
	return (
		<>
			{isLoading && (
				<div className="fixed top-0 left-0 border-2 border-solid border-black flex justify-center items-center w-full h-full">
					<Oval
						visible={isLoading}
						height="80"
						width="80"
						color="#006600"
						ariaLabel="oval-loading"
					/>
				</div>
			)}
		</>
	);
}

export default Loader;
