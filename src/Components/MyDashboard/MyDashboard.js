import React, { useState, useEffect } from "react";
import Graph from "../Graph/Graph";
import Navbar from "../Navbar/Navbar";
import Metrics from "../Metrics/Metrics";
import API_URL from "../../apiConfig";

function MyDashboard({ userid }) {
	const [showNav, setShowNav] = useState(false);
	const [userOutBetData, setUserOutBetData] = useState([]);
	const [userResBetData, setUserResBetData] = useState([]);
	const [userData, setUserData] = useState({});
	const [userId, setUserId] = useState(null);

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
				const outData = await data
					.filter((bet) => bet.resolved === false)
					.map(({ event_finish, bookmaker, name, wager, odds, pot_win }) => ({
						event_finish,
						bookmaker,
						name,
						wager,
						odds,
						pot_win,
					}));
				setUserOutBetData(outData);
				const resData = await data
					.filter((bet) => bet.resolved === true)
					.map(({ event_finish, name }) => ({
						event_finish,
						name,
					}));
				setUserResBetData(resData);
			}
		} catch (error) {
			console.log("user bet data error");
		}
	}

	async function getUserID() {
		try {
			const response1 = await fetch(API_URL + "users/me", {
				headers: {
					Authorization: `Token ${localStorage.getItem("token")}`,
				},
			});
			if (response1.status === 200) {
				const data = await response1.json();
				await setUserId(data.id);
				await console.log(data);
				await console.log("user ID");
				await getUserInfo();
			}
		} catch (error) {
			console.log("user data error");
		}
	}

	async function getUserInfo() {
		try {
			const response2 = await fetch(
				API_URL + `users/${localStorage.getItem("id")}`,
				{
					headers: {
						Authorization: `Token ${localStorage.getItem("token")}`,
					},
				}
			);
			if (response2.status === 200) {
				const data = await response2.json();
				console.log("user info");
				await setUserData(data);
			}
		} catch (error) {}
	}
	useEffect(() => {
		getBetData();
		getUserID();
		console.log("run dashboard useEffect");
	}, []);

	return (
		<div className="dashboard-container">
			<Graph />
			<Metrics userData={userData} />
			<div className="outstanding-bets-container">
				<div className="out-table-container">
					<table>
						<tr key="header">
							<th>Date Event</th>
							<th>Name</th>
							<th>Bet Type</th>
							<th>Wager</th>
							<th></th>
						</tr>
					</table>
				</div>
			</div>
			<div className="resolved-bets-container">
				<div className="win-container">
					<div className="win-table-container"></div>
				</div>
				<div className="loss-container">
					<div className="win-table-container"></div>
				</div>
			</div>
		</div>
	);
}

export default MyDashboard;
