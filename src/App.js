import React from "react";

import RoomAllocation from "./components/RoomAllocation";

function App() {
	return (
		<div className="App">
			<RoomAllocation
				guest={12}
				room={4}
				onChange={(result) => {
					console.log(result);
				}}
			/>
		</div>
	);
}
export default App;
