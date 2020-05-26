import React, { useContext, useEffect } from "react";
import AppContext from "../contexts/AppContext";

const Customers = ({ ...props }) => {
	const [, setTitle] = useContext(AppContext);

	useEffect(() => {
		setTitle("Kunden");
	}, [setTitle]);

	return <div></div>;
};

export default Customers;
