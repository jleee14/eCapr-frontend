import React, { useState, useEffect } from "react";
import CreateModal from "../CreateModal/CreateModal";
import EditModal from "../EditModal/EditModal";
import Navbar from "../Navbar/Navbar";
import Bet from "../Bet/Bet";

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

    function resolve(event)

	async function getBetData() {
		try {
			const response = await fetch("http://localhost:8000/bets/");
			if (response.status === 200) {
				const data = await response.json();
				const reduceData = await data.map({
					bookmaker,
					name,
					date_placed,
					event_finish,
					wager,
                    odds,
                    pot_win,
					sport,
					league,
                    
                    
				});
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
	}, []);
	return (
		<div className="mybets-container">
			<button className={showNav ? "open-nav" : "closed-nav"}>
				Nav
				{/* favicon */}
			</button>
			<Navbar showNav={showNav} />
			{addModalToggle && <CreateModal />}
			{editModalToggle && <EditModal />}
			<button className="add-bet" onClick={showAddModal}>
				+ Add Bet
			</button>
			<div className="bets-container">
				<h3>Your Bets</h3>
				<table>
					<tr key="header">
                        {}
                    </tr>
				</table>
			</div>
		</div>
	);
}

export default MyBets;
