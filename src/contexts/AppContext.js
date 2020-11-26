import React, { useState, createContext } from "react";

const AppContext = createContext();

const AppProvider = ({ ...props }) => {
	const [title, setTitle] = useState();

	return (
		<AppContext.Provider value={[title, setTitle]}>
			{props.children}
		</AppContext.Provider>
	);
};

export { AppContext as default, AppProvider };
