import React from "react";
import API_URL from "../../apiConfig";

function Bet({ showEditModal, row, deleteLoad }) {
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
				<button onClick={showEditModal}>Edit</button>
				<button onClick={handleDelete}>Delete</button>
			</td>
		</tr>
	);
}

export default Bet;
