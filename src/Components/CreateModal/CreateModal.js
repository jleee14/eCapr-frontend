import React, { useState } from "react";
import API_URL from "../../apiConfig";
import "./CreateModal.css";

function CreateModal({ showAddModal }) {
	const initialState = {
		name: "",
		bookmaker: "",
		odds: 0,
		bet_type: 0,
		event_finish: "",
		wager: 0,
		sport: "",
		league: "",
		notes: "",
		pot_win: 0.0,
		resolved: false,
	};
	const [bet, setBet] = useState(initialState);
	const [betReturn, setBetReturn] = useState(0);

	function handleChange(event) {
		event.preventDefault();
		setBet({ ...bet, [event.target.id]: event.target.value });
	}

	async function handleSubmit(event) {
		event.preventDefault();
		try {
			const response = await fetch(API_URL + "bets/", {
				method: "POST",
				body: JSON.stringify(bet),
				headers: {
					Authorization: `Token ${localStorage.getItem("token")}`,
					"content-type": "application/json",
				},
			});
			if (response.status === 201) {
				setTimeout(() => {
					showAddModal();
				}, 500);
			}
		} catch (error) {}
	}

	async function calculateReturn(event) {
		if (bet.odds < -99) {
			let pot_win = (await (100 / Math.abs(bet.odds))) * bet.wager;
			pot_win = await pot_win.toFixed(2);
			await setBetReturn(pot_win.toFixed(2));
			await setBet({ ...bet, pot_win: pot_win });
		} else {
			let pot_win = (await (bet.odds / 100)) * bet.wager;
			pot_win = await pot_win.toFixed(2);
			await setBetReturn(pot_win);
			await setBet({ ...bet, pot_win: pot_win });
		}
	}
	return (
		<div className="modal-container">
			<div className="form-container">
				<div className="header-container">
					<h3>Create Bet</h3>
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
								<option value="Parlay">Parlay</option>
								<option value="Futures">Futures</option>
								<option value="Moneyline">Money Line</option>
								<option value="Over Under">Totals: Over/Under</option>
								<option value="Teaser">Teaser</option>
								<option value="Player Prop">Player Prop</option>
								<option value="Team Prop">Team Prop</option>
								<option value="Other Prop">Other Prop</option>
								<option value="Live Bet">Futures/Outright</option>
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
								<option value="Basketball">Basketball</option>
								<option value="Baseball">Baseball</option>
								<option value="Football">American Football</option>
								<option value="Soccer">Football</option>
								<option value="Golf">Golf</option>
								<option value="Tennis">Tennis</option>
								<option value="Mma">MMA</option>
								<option value="Boxing">Boxing</option>
								<option value="Hockey">Hockey</option>
								<option value="Horseracing">Horse Racing</option>
								<option value="eSports">ESports</option>
								<option value="Cricket">Cricket</option>
								<option value="Rugby">Rugby</option>
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
						Add Bet
					</button>
				</form>
			</div>
		</div>
	);
}

export default CreateModal;
