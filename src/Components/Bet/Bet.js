import React, { useState } from "react";
import API_URL from "../../apiConfig";
import "./Bet.css";

function Bet({ setBetId, showEditModal, row, deleteLoad, showResModal }) {
	async function clickEdit(event) {
		await setBetId(row.id);
		await showEditModal();
	}
	async function clickResolve(event) {
		await setBetId(row.id);
		await showResModal();
	}
	async function handleDelete(event) {
		try {
			await fetch(API_URL + `bets/${row.id}`, {
				method: "DELETE",
				headers: {
					Authorization: `Token ${localStorage.getItem("token")}`,
				},
			});
			await deleteLoad();
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<tr key={row.id}>
			{Object.values(row)
				.slice(0, -1)
				.map((val) => (
					<td>{val}</td>
				))}
			<td>
				<button className="table-button" onClick={clickEdit}>
					Edit
				</button>
				<button className="table-button" onClick={clickResolve}>
					Resolve
				</button>
				<button className="table-button" onClick={handleDelete}>
					Delete
				</button>
			</td>
		</tr>
	);
}

export default Bet;
