import React from "react";

function Metrics({ userData }) {
	return (
		<div className="metrics-container">
			<div className="stat-container">
				<h4 className="stat-cat-header">Wins: </h4>
				<p className="stat-data">{userData.wins}</p>
			</div>
			<div className="stat-container">
				<h4 className="stat-cat-header">Losses: </h4>
				<p className="stat-data">{userData.losses}</p>
			</div>
			<div className="stat-container">
				<h4 className="stat-cat-header">Pushes: </h4>
				<p className="stat-data">{userData.pushes}</p>
			</div>
		</div>
	);
}

export default Metrics;
