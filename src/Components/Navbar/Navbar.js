import React, { useState } from "react";
import { Link } from "react-router-dom";

function Navbar(props) {
	return (
		<div className="nav-container">
			<Link to="/dashboard">
				<div className="link-container">MyDashboard</div>
			</Link>
			<Link to="/bets">
				<div className="link-container">MyBets</div>
			</Link>
		</div>
	);
}

export default Navbar;
