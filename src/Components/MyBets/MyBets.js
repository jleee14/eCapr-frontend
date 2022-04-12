import React, { useState } from "react";
import CreateModal from "../CreateModal/CreateModal";
import EditModal from "../EditModal/EditModal";

function MyBets(props) {
	const [addModalToggle, setAddModalToggle] = useState(false);
	const [editModalToggle, setEditModalToggle] = useState(false);
	function showAddModal(event) {
		setAddModalToggle(!addModalToggle);
	}

	function showEditModal(event) {
		setEditModalToggle(!addModalToggle);
	}
	return (
		<div className="mybets-container">
			{addModalToggle && <CreateModal />}
			{editModalToggle && <EditModal />}
			<button className="add-bet" onClick={showAddModal}>
				+ Add Bet
			</button>
			<div className="outstanding-bets-container">
				<h3>Outstanding Bets</h3>
				{/* Mapping with filter */}
			</div>
			<div className="resolved-bets-container">
				<h3>Resolved Bets</h3>
				{/* Mapping with filter */}
			</div>
		</div>
	);
}

export default MyBets;
