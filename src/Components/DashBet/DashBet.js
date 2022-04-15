import React from "react";

function DashBet(props) {
	return (
		<tr key={row.id}>
			{Object.values(row).map((val) => (
				<td>{val}</td>
			))}
		</tr>
	);
}

export default DashBet;
