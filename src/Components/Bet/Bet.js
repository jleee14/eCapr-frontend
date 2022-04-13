import React from "react";

function Bet({ showEdit, bet }) {
	return (
		<div className="bet-container">
			<li>
				{bet.name}
				<div className="button-container">
					<button onClick={showEdit}>Edit</button>
					<button>Delete</button>
				</div>
			</li>
		</div>
	);
}

export default Bet;
