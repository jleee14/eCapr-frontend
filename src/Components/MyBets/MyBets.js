import React, { useState, useEffect } from "react";
import CreateModal from "../CreateModal/CreateModal";
import EditModal from "../EditModal/EditModal";
import "./MyBets.css";
import Bet from "../Bet/Bet";
import ResModal from "../ResModal/ResModal";
import API_URL from "../../apiConfig";
import { local } from "d3";

function MyBets() {
	const [addModalToggle, setAddModalToggle] = useState(false);
	const [editModalToggle, setEditModalToggle] = useState(false);
	const [resModalToggle, setResModalToggle] = useState(false);
	const [betId, setBetId] = useState(null);
	const [tableData, setTableData] = useState([]);
	const [delListen, setDelListen] = useState(false);

	function showAddModal(event) {
		setAddModalToggle(!addModalToggle);
	}
	function showEditModal(event) {
		setEditModalToggle(!editModalToggle);
	}
	function showResolveModal(event) {
		setResModalToggle(!resModalToggle);
	}

	function deleteLoad(event) {
		setDelListen(!delListen);
	}

	async function calculateUserData() {
		try {
			await console.log("calc begin");
			if (tableData.length !== 0) {
				const userWins = await tableData.filter(
					(bet) => bet.bet_result === "win"
				).length;

				const userLosses = await tableData.filter(
					(bet) => bet.bet_result === "loss"
				).length;

				const userPushes = await tableData.filter(
					(bet) => bet.bet_result === "push"
				).length;

				const response = await fetch(
					API_URL + `users/` + localStorage.getItem("id"),
					{
						method: "PATCH",
						body: JSON.stringify({
							wins: userWins,
							losses: userLosses,
							pushes: userPushes,
						}),
						headers: {
							Authorization: `Token ${localStorage.getItem("token")}`,
							"content-type": "application/json",
						},
					}
				);
				if (response.status === 200) {
					await console.log("user updated");
				} else {
					console.log("error");
				}
				return;
			} else {
				return;
			}
		} catch (error) {}
	}

	async function getBetData() {
		fetch(API_URL + "bets/", {
			headers: {
				Authorization: `Token ${localStorage.getItem("token")}`,
			},
		})
			.then((response) => {
				if (response.status === 200) {
					return response.json();
				}
			})
			.then(async (data) => {
				const reduceData = await data
					.map(
						({
							date_placed,
							bookmaker,
							name,
							bet_type,
							sport,
							league,
							event_finish,
							wager,
							odds,
							pot_win,
							bet_result,
							notes,
							id,
						}) => ({
							date_placed,
							bookmaker,
							name,
							bet_type,
							sport,
							league,
							event_finish,
							wager,
							odds,
							pot_win,
							bet_result,
							notes,
							id,
						})
					)
					.sort(function (a, b) {
						return new Date(a.date_placed) - new Date(b.date_placed);
					});
				await setTableData(reduceData);
			})
			.catch((err) => {
				console.log(err);
			});
	}

	useEffect(() => {
		getBetData();
	}, [addModalToggle, editModalToggle, resModalToggle, delListen]);

	useEffect(() => {
		calculateUserData();
	}, [tableData]);

	return (
		<>
			{addModalToggle && <CreateModal showAddModal={showAddModal} />}
			{editModalToggle && (
				<EditModal betId={betId} showEditModal={showEditModal} />
			)}
			{resModalToggle && (
				<ResModal betId={betId} showResolveModal={showResolveModal} />
			)}
			<div className="mybets-container">
				<div className="mybets-header-container">
					<h3 className="mybet-header">MyBets</h3>
					<button className="add-bet" onClick={showAddModal}>
						+ Add Bet
					</button>
				</div>
				<div className="bets-container">
					<table>
						<thead className="header-table">
							<tr>
								<th>Date Placed</th>
								<th>Bookmaker</th>
								<th>Name</th>
								<th>Bet Type</th>
								<th>Sport</th>
								<th>League</th>
								<th>Date of Event</th>
								<th>Wager Amount</th>
								<th>Odds</th>
								<th>Potential Return</th>
								<th>Bet Result</th>
								<th>Notes</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{tableData.reverse().map((row) => (
								<Bet
									row={row}
									showEditModal={showEditModal}
									showResModal={showResolveModal}
									setBetId={setBetId}
									deleteLoad={deleteLoad}
								/>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</>
	);
}

export default MyBets;
