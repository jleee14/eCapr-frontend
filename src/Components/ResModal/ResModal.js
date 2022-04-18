import React, { useState, useEffect } from "react";
import API_URL from "../../apiConfig";
import "./ResModal.css";

function ResModal({ betId, showResolveModal }) {
	const [bet, setBet] = useState({});
	const [profit, setProfit] = useState(null);

	async function getBetInfo(betId) {
		try {
			const response = await fetch(API_URL + `bets/${betId}`, {
				headers: {
					Authorization: `Token ${localStorage.getItem("token")}`,
				},
			});
			const data = await response.json();
			setBet(data);
			setProfit(data.profit);
		} catch (error) {}
	}

	function calculateProfit(result) {
		if (result === "win") {
			const wProfit = bet.pot_win;
			setProfit(wProfit);
			setBet({ ...bet, profit: wProfit, bet_result: result });
		} else if (result === "loss") {
			const lProfit = -bet.wager;
			setProfit(lProfit);
			setBet({ ...bet, profit: lProfit, bet_result: result });
		} else {
			const pProfit = 0.0;
			setProfit(pProfit);
			setBet({ ...bet, profit: pProfit, bet_result: result });
		}
	}

	async function sendResolve(event) {
		try {
			const response = await fetch(API_URL + `bets/${betId}`, {
				method: "PUT",
				body: JSON.stringify(bet),
				headers: {
					Authorization: `Token ${localStorage.getItem("token")}`,
					"content-type": "application/json",
				},
			});
			if (response.status === 200) {
				setTimeout(() => {
					showResolveModal();
				}, 1000);
			}
		} catch (error) {}
	}

	useEffect(() => {
		getBetInfo(betId);
	}, []);

	return (
		<div className="modal-container">
			<div className="form-container" id="resform">
				<div className="header-container">
					<h3>Resolve Bet</h3>
				</div>
				<div className="resolution-container">
					<div
						className="res-containers"
						onClick={() => calculateProfit("win")}
					>
						Win
					</div>
					<div
						className="res-containers"
						onClick={() => calculateProfit("loss")}
					>
						Loss
					</div>
					<div
						className="res-containers"
						onClick={() => calculateProfit("push")}
					>
						Push
					</div>
				</div>
				<p id="profit-msg">
					Recorded Profit: <span className="result-container">${profit}</span>
				</p>
				<div className="warning-msg-container">
					<p>
						Warning: to avoid cheating and to encourage honesty, you will not be
						able to edit, delete, or undo bet resolutions once they have been
						saved. Make sure your entry is correct before saving!
					</p>
				</div>
				<button
					className="form-submit-button"
					id="resolve-button"
					onClick={sendResolve}
				>
					Resolve Bet
				</button>
			</div>
		</div>
	);
}

export default ResModal;
