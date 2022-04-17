import React, { useState, useEffect } from "react";
import Graph from "../Graph/Graph";
import Metrics from "../Metrics/Metrics";
import API_URL from "../../apiConfig";
import "./MyDashboard.css";

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
					.filter((bet) => bet.bet_result === "None")
					.map(({ event_finish, name, bet_type, wager, odds, pot_win }) => ({
						event_finish,
						name,
						bet_type,
						wager,
						odds,
						pot_win,
					}));
				await setUserOutBetData(outData);
				await console.log(userOutBetData);
				const resData = await data
					.filter((bet) => bet.bet_result !== "None")
					.map(({ event_finish, name, bet_type, profit }) => ({
						event_finish,
						name,
						bet_type,
						profit,
					}));
				await setUserResBetData(resData);
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
					<h3>Outstanding Bets</h3>
					<table>
						<tr key="header">
							<th>Event Date</th>
							<th>Name</th>
							<th>Bet Type</th>
							<th>Wager</th>
							<th>Odds</th>
							<th>Pot. Return</th>
						</tr>

						{userOutBetData.map((row) => {
							return (
								<tr>
									{Object.values(row).map((val) => (
										<td>{val}</td>
									))}
								</tr>
							);
						})}
					</table>
				</div>
			</div>
			<div className="resolved-bets-container">
				<div className="win-container">
					<div className="win-table-container">
						<h3>Bets Won</h3>
						<table>
							<thead>
								<th>Event Date</th>
								<th>Name</th>
								<th>Bet Type</th>
								<th>Profit</th>
							</thead>
							<tbody>
								{userResBetData
									.filter((bet) => bet.profit > 0)
									.map((row) => {
										return (
											<tr>
												{Object.values(row).map((val) => (
													<td>{val}</td>
												))}
											</tr>
										);
									})}
							</tbody>
						</table>
					</div>
				</div>
				<div className="loss-container">
					<div className="win-table-container">
						<h3>Bets Lost/Pushed</h3>
						<table>
							<thead>
								<th>Event Date</th>
								<th>Name</th>
								<th>Bet Type</th>
								<th>Profit</th>
							</thead>
							<tbody>
								{userResBetData
									.filter((bet) => bet.profit <= 0)
									.map((row) => {
										return (
											<tr>
												{Object.values(row).map((val) => (
													<td>{val}</td>
												))}
											</tr>
										);
									})}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
}

export default MyDashboard;
