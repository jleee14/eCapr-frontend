import React from "react";

function ResModal(props) {
	function calculateProfit(event) {}
	return (
		<div className="modal-container">
			<div className="form-container">
				<form>
					<h3>Resolve Bet</h3>
					<div>Win</div>
					<div>Loss</div>
					<div>Push</div>
					<p>Recorded Profit</p>
					<p>
						Warning: to avoid cheating and to encourage honesty, you will not be
						able to edit, delete, or undo bet resolutions once they have been
						saved. Make sure your entry is correct before saving!
					</p>
					<button type="submit">Resolve Bet</button>
				</form>
			</div>
		</div>
	);
}

export default ResModal;
