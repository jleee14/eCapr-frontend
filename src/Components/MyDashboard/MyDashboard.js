import React, { useState, useEffect } from "react";
import Graph from "../Graph/Graph";
import Navbar from "../Navbar/Navbar";
import Metrics from "../Metrics/Metrics";
import API_URL from "../../apiConfig";

function MyDashboard({ userid }) {
	const [showNav, setShowNav] = useState(false);
	const [userBetData, setUserBetData] = useState([]);
	const [userData, setUserData] = useState({});

	function toggleNav(event) {
		setShowNav(!showNav);
	}
	async function getBetData() {
		try {
			const response = await fetch(API_URL + "bets/", {
				headers: {
					Authorization: `Token ${localStorage.getItem("token")}`,
				},
			});

			if (response.status === 200) {
				const data = await response.json();
				const reduceData = setUserBetData(data);
			}
		} catch (error) {
			console.log("user bet data error");
		}
	}
	async function getUserData() {
		try {
			const response = await fetch(API_URL + `users/${userid}`, {
				headers: {
					Authorization: `Token ${localStorage.getItem("token")}`,
				},
			});

			if (response.status === 200) {
				const data = await response.json();
				setUserData(data);
			}
		} catch (error) {
			console.log("user data error");
		}
	}

	useEffect(() => {
		getBetData();
		getUserData();
		console.log("run dashboard useEffect");
	}, []);

	return (
		<div className="dashboard-container">
			<button className={showNav ? "open-nav" : "closed-nav"}>
				Nav
				{/* favicon */}
			</button>
			<Navbar showNav={showNav} />
			<Graph />
			<Metrics userData={userData} />
			<div className="outstanding-bets-container">
				Oustanding bet placeholder
			</div>
			<div className="resolved-bets-container">Resolved bet placeholder</div>
		</div>
	);
}

export default MyDashboard;
