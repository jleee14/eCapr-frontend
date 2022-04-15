import React, { useState, useEffect } from "react";
import CreateModal from "../CreateModal/CreateModal";
import EditModal from "../EditModal/EditModal";
import Navbar from "../Navbar/Navbar";
import Bet from "../Bet/Bet";
import API_URL from "../../apiConfig";

function MyBets({ userid }) {
	const [addModalToggle, setAddModalToggle] = useState(false);
	const [editModalToggle, setEditModalToggle] = useState(false);
	const [showNav, setShowNav] = useState(false);
	const [userBetData, setUserBetData] = useState([]);
	const [betId, setBetId] = useState(null);
	const [userData, setUserData] = useState({});
	const [tableData, setTableData] = useState([]);
	const [delListen, setDelListen] = useState(false);

	function showAddModal(event) {
		setAddModalToggle(!addModalToggle);
	}
	function showEditModal(event) {
		setEditModalToggle(!editModalToggle);
	}
	function toggleNav(event) {
		setShowNav(!showNav);
	}

	function deleteLoad(event) {
		setDelListen(!delListen);
	}

	function calculateProfit() {}

	async function getUserData() {
		try {
			const response = await fetch(
				API_URL + `users/${localStorage.getItem("id")}`,
				{
					headers: {
						Authorization: `Token ${localStorage.getItem("token")}`,
					},
				}
			);

			if (response.status === 200) {
				const data = await response.json();
				setUserData(data);
				console.log("fetch user data");
				console.log(userData);
			}
		} catch (error) {
			console.log("user data error");
		}
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
				const reduceData = await data.map(
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
						id,
					})
				);
				setUserBetData(data);
				setTableData(reduceData);
			}
		} catch (error) {
			console.log("error");
		}
	}

	useEffect(() => {
		getBetData();
		getUserData();
		console.log("run myBet useEffect");
	}, [addModalToggle, editModalToggle, delListen]);

	return (
		<div className="mybets-container">
			<button className={showNav ? "open-nav" : "closed-nav"}>
				Nav
				{/* favicon */}
			</button>
			<Navbar showNav={showNav} />
			{addModalToggle && <CreateModal showAddModal={showAddModal} />}
			{editModalToggle && (
				<EditModal betId={betId} showEditModal={showEditModal} />
			)}
			<button className="add-bet" onClick={showAddModal}>
				+ Add Bet
			</button>
			<div className="bets-container">
				<h3>Your Bets</h3>
				<table>
					<tr key="header">
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
						<th>Actions</th>
					</tr>
					{tableData.map((row) => (
						<Bet
							row={row}
							showEditModal={showEditModal}
							setBetId={setBetId}
							deleteLoad={deleteLoad}
						/>
					))}
				</table>
			</div>
		</div>
	);
}

export default MyBets;
