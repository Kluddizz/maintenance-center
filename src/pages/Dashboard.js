import React, { useContext, useEffect } from "react";
import AppContext from "../contexts/AppContext";

const Dashboard = ({ ...props }) => {
	const [, setTitle] = useContext(AppContext);

	useEffect(() => {
		setTitle("Dashboard");
	}, [setTitle]);

	return <div></div>;
};

export default Dashboard;
