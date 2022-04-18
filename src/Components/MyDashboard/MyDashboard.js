import React, { useState, useEffect } from "react";
import Graph from "../Graph/Graph";
import Metrics from "../Metrics/Metrics";
import API_URL from "../../apiConfig";
import "./MyDashboard.css";

function MyDashboard() {
	const initialUserStats = {
		car_profit: 0,
		avg_bet: 0,
	};
	const [showNav, setShowNav] = useState(false);
	const [userStats, setUserStats] = useState(initialUserStats);
	const [betData, setBetData] = useState([]);
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
				await setBetData(data);
				const outData = await data
					.filter((bet) => bet.bet_result === "None")
					.map(({ event_finish, name, bet_type, wager, odds, pot_win }) => ({
						event_finish,
						name,
						bet_type,
						wager,
						odds,
						pot_win,
					}))
					.sort((a, b) => new Date(b.event_finish) - new Date(a.event_finish));
				await setUserOutBetData(outData);
				const resData = await data
					.filter((bet) => bet.bet_result !== "None")
					.map(({ event_finish, name, bet_type, profit }) => ({
						event_finish,
						name,
						bet_type,
						profit,
					}))
					.sort((a, b) => new Date(b.event_finish) - new Date(a.event_finish));
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
				await getUserInfo();
			}
		} catch (error) {}
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
				await setUserData(data);
			}
		} catch (error) {}
	}

	function calculateProfits() {
		const careerProfit = userResBetData
			.reduce((accum, bet) => accum + parseFloat(bet.profit), 0)
			.toFixed(2);
		const totalBetVol = betData.reduce(
			(accum, bet) => accum + parseFloat(bet.wager),
			0
		);
		const avgBetSize = (totalBetVol / betData.length).toFixed(2);
		setUserStats({
			...userStats,
			car_profit: careerProfit,
			avg_bet: avgBetSize,
		});
	}

	useEffect(() => {
		getBetData();
		getUserID();
	}, []);

	useEffect(() => {
		calculateProfits();
	}, [userResBetData]);

	return (
		<div className="dashboard-container">
			<div className="dashboard-top-container">
				<Graph betData={betData} />
				<Metrics userData={userData} userStats={userStats} />
			</div>
			<div className="dashboard-bottom-container">
				<div className="outstanding-bets-container">
					<div className="out-table-container">
						<h3 className="table-title">Outstanding Bets</h3>
						<table>
							<thead>
								<tr>
									<th>Event Date</th>
									<th>Name</th>
									<th>Bet Type</th>
									<th>Wager</th>
									<th>Odds</th>
									<th>Pot. Return</th>
								</tr>
							</thead>
							<tbody>
								{userOutBetData.map((row) => {
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
				<div className="resolved-bets-container">
					<div className="win-container">
						<div className="win-table-container">
							<h3 className="table-title">Bets Won</h3>
							<table>
								<thead>
									<tr>
										<th>Event Date</th>
										<th>Name</th>
										<th>Bet Type</th>
										<th>Profit</th>
									</tr>
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
							<h3 className="table-title">Bets Lost/Pushed</h3>
							<table>
								<thead>
									<tr>
										<th>Event Date</th>
										<th>Name</th>
										<th>Bet Type</th>
										<th>Profit</th>
									</tr>
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
		</div>
	);
}

export default MyDashboard;
