import React, { useContext, useEffect } from "react";
import AppContext from "../contexts/AppContext";

const Maintenances = ({ ...props }) => {
	const [, setTitle] = useContext(AppContext);

	useEffect(() => {
		setTitle("Wartungen");
	}, [setTitle]);

	return <div></div>;
};

export default Maintenances;
