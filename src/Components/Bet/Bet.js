import React from "react";

function Bet({ showEditModal, row, deleteBet }) {
	return (
		<tr key={row.id}>
			{Object.values(row).map((val) => (
				<td>{val}</td>
			))}
			<td>
				<button onClick={showEditModal}>Edit</button>
				<button>Delete</button>
			</td>
		</tr>
	);
}

export default Bet;
