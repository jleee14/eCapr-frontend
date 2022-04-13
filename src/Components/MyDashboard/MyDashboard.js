import React, { useState } from "react";
import Graph from "../Graph/Graph";
import Navbar from "../Navbar/Navbar";

function MyDashboard(props) {
	const [showNav, setShowNav] = useState(false);
	function toggleNav(event) {
		setShowNav(!showNav);
	}
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
