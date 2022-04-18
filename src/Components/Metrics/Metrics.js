import React, { useEffect } from "react";
import "./Metrics.css";

function Metrics({ userData, userStats }) {
	return (
		<div className="metrics-container">
			<h3 className="metrics-header">MyMetrics</h3>
			<div className="metrics-stats-container">
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
				<div className="stat-container">
					<h4 className="stat-cat-header">Average bet size: </h4>
					<p className="stat-data">
						{!userStats.avg_bet ? "$0.00" : `$${userStats.avg_bet}`}
					</p>
				</div>
				<div className="stat-container">
					<h4 className="stat-cat-header">Career profit: </h4>
					<p className="stat-data">${userStats.car_profit}</p>
				</div>
			</div>
		</div>
	);
}

export default Metrics;
