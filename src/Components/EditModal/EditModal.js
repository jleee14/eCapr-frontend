import React, { useState, useEffect } from "react";
import API_URL from "../../apiConfig";

function EditModal({ betId, showEditModal }) {
	const [bet, setBet] = useState({});
	const [betReturn, setBetReturn] = useState(0);

	function handleChange(event) {
		event.preventDefault();
		setBet({ ...bet, [event.target.id]: event.target.value });
	}

	async function handleSubmit(event) {
		event.preventDefault();
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
					showEditModal();
				}, 500);
			}
		} catch (error) {}
	}

	async function calculateReturn(event) {
		if (bet.odds < -99) {
			let pot_win = (await (100 / Math.abs(bet.odds))) * bet.wager;
			await setBetReturn(pot_win.toFixed(2));
			await setBet({ ...bet, pot_win: pot_win });
		} else {
			let pot_win = (await (bet.odds / 100)) * bet.wager;
			pot_win = await pot_win.toFixed(2);
			await setBetReturn(pot_win);
			await setBet({ ...bet, pot_win: pot_win });
		}
	}

	async function getBetInfo(betId) {
		try {
			const response = await fetch(API_URL + `bets/${betId}`, {
				headers: {
					Authorization: `Token ${localStorage.getItem("token")}`,
				},
			});
			const data = await response.json();
			setBet(data);
		} catch (error) {}
	}
	useEffect(() => {
		getBetInfo(betId);
	}, []);

	return (
		<div className="modal-container">
			<div className="form-container">
				<div className="header-container">
					<h3>Edit Bet</h3>
				</div>
				<form onSubmit={handleSubmit}>
					<div className="form-data-container">
						<div className="bet-parameter">
							<label htmlFor="name">Name of bet: </label>
							<input
								type="text"
								id="name"
								value={bet.name}
								onChange={handleChange}
								required
							/>
						</div>
						<div className="bet-parameter">
							<label htmlFor="bookmaker">Bookmaker: </label>
							<input
								type="text"
								id="bookmaker"
								value={bet.bookmaker}
								onChange={handleChange}
								required
							/>
						</div>
						<div className="bet-parameter">
							<label htmlFor="event_finish">Date of event: </label>
							<input
								type="date"
								id="event_finish"
								value={bet.event_finish}
								onChange={handleChange}
								required
							/>
						</div>
						<div className="bet-parameter">
							<label htmlFor="bet_type">Bet Type: </label>
							<select
								name="bet_type"
								id="bet_type"
								onChange={handleChange}
								value={bet.bet_type}
							>
								<option value="">Select Bet Type</option>
								<option value="parlay">Parlay</option>
								<option value="future">Futures</option>
								<option value="moneyline">Money Line</option>
								<option value="overunder">Totals: Over/Under</option>
								<option value="teaser">Teaser</option>
								<option value="playerprop">Player Prop</option>
								<option value="teamprop">Team Prop</option>
								<option value="otherprop">Other Prop</option>
								<option value="futures">Futures/Outright</option>
							</select>
						</div>
						<div className="bet-parameter">
							<label htmlFor="wager">Wager: </label>
							<input
								type="number"
								id="wager"
								className="number-input"
								value={bet.wager}
								onChange={handleChange}
								onBlur={calculateReturn}
								required
							/>
						</div>
						<div className="bet-parameter">
							<label htmlFor="odds">
								Odds &#40;if negative, enter negative number&#41;:
							</label>
							<input
								type="number"
								className="number-input"
								id="odds"
								value={bet.odds}
								onChange={handleChange}
								onBlur={calculateReturn}
								required
							/>
						</div>
						<div className="bet-parameter">
							<label htmlFor="sport">Sport: </label>
							<select
								name="sport"
								id="sport"
								onChange={handleChange}
								value={bet.sport}
							>
								<option value="">Choose an option below</option>
								<option value="basketball">Basketball</option>
								<option value="baseball">Baseball</option>
								<option value="football">American Football</option>
								<option value="soccer">Football</option>
								<option value="golf">Golf</option>
								<option value="tennis">Tennis</option>
								<option value="mma">MMA</option>
								<option value="boxing">Boxing</option>
								<option value="hockey">Hockey</option>
								<option value="horseracing">Horse Racing</option>
								<option value="esports">ESports</option>
								<option value="cricket">Cricket</option>
								<option value="rugby">Rugby</option>
							</select>
						</div>
						<div className="bet-parameter">
							<label htmlFor="league">League: </label>
							<input
								type="input"
								id="league"
								value={bet.league}
								onChange={handleChange}
							/>
						</div>
						<div className="bet-parameter">
							<label htmlFor="notes">Notes: </label>
							<textarea
								name="notes"
								id="notes"
								cols="35"
								rows="7"
								onChange={handleChange}
								value={bet.notes}
							></textarea>
						</div>
					</div>
					<div className="calculated-field">
						<p className="pot-return">
							Potential return: $
							<span className="win-value" value={bet.pot_win}>
								{betReturn}
							</span>
						</p>
					</div>
					<button type="submit" className="form-submit-button">
						Edit Bet
					</button>
				</form>
			</div>
		</div>
	);
}

export default EditModal;
