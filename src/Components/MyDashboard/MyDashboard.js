import React, { useState, useEffect } from "react";
import Graph from "../Graph/Graph";
import Navbar from "../Navbar/Navbar";

function MyDashboard(props) {
	const [showNav, setShowNav] = useState(false);
	const [userBetData, setUserBetData] = useState([]);

	function toggleNav(event) {
		setShowNav(!showNav);
	}
	async function getUserData() {
		try {
			const response = await fetch("http://localhost:8000/bets/");
			if (response.status === 200) {
				const data = await response.json();
				setUserBetData(data);
			}
		} catch (error) {
			console.log("error");
		}
	}
	useEffect(() => {
		getUserData();
		console.log("run useEffect");
	}, []);

	return (
		<div className="dashboard-container">
			<button className={showNav ? "open-nav" : "closed-nav"}>
				Nav
				{/* favicon */}
			</button>
			<Navbar showNav={showNav} />
			<Graph />
			<div className="metrics-container">Metrics placeholder</div>
			<div className="outstanding-bets-container">
				Oustanding bet placeholder
			</div>
			<div className="resolved-bets-container">Resolved bet placeholder</div>
		</div>
	);
}

export default MyDashboard;
