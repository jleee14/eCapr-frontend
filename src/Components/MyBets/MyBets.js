import React, { useState, useEffect } from "react";
import CreateModal from "../CreateModal/CreateModal";
import EditModal from "../EditModal/EditModal";
import Navbar from "../Navbar/Navbar";
import Bet from "../Bet/Bet";
import API_URL from "../../apiConfig";

function MyBets(props) {
	const [addModalToggle, setAddModalToggle] = useState(false);
	const [editModalToggle, setEditModalToggle] = useState(false);
	const [showNav, setShowNav] = useState(false);
	const [userBetData, setUserBetData] = useState([]);
	const [tableData, setTableData] = useState([]);

	function showAddModal(event) {
		setAddModalToggle(!addModalToggle);
	}

	function showEditModal(event) {
		setEditModalToggle(!addModalToggle);
	}
	function toggleNav(event) {
		setShowNav(!showNav);
	}

	function resolve(event) {}
	async function getBetData() {
		try {
			const response = await fetch(API_URL + "bets/");
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
		console.log("run useEffect");
	}, [addModalToggle]);
	return (
		<div className="mybets-container">
			<button className={showNav ? "open-nav" : "closed-nav"}>
				Nav
				{/* favicon */}
			</button>
			<Navbar showNav={showNav} />
			{addModalToggle && <CreateModal showAddModal={showAddModal} />}
			{editModalToggle && <EditModal />}
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
						<tr key={row.id}>
							{Object.values(row).map((val) => (
								<td>{val}</td>
							))}
							<td>
								<button>Edit</button>
								<button>Delete</button>
							</td>
						</tr>
					))}
				</table>
			</div>
		</div>
	);
}

export default MyBets;
