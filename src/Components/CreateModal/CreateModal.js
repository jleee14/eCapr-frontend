import React, { useState } from "react";
import MyBets from "../MyBets/MyBets";

function CreateModal(props) {
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
	};
	const [bet, setBet] = useState(initialState);
	const [betReturn, setBetReturn] = useState(0);

	function handleChange(event) {
		event.preventDefault();
		setBet({ ...bet, [event.target.id]: event.target.value });
	}

	function handleSubmit(event) {
		event.preventDefault();
		// API request
	}

	function calculateReturn(event) {
		if (event.target.value < -99) {
			let pot_win = (100 / Math.abs(event.target.value)) * bet.wager;
			console.log("calculation ran");
			setBetReturn(pot_win.toFixed(2));
		} else {
			let pot_win = (event.target.value / 100) * bet.wager;
			pot_win = pot_win.toFixed(2);
			setBetReturn(pot_win);
		}
	}
	return (
		<div className="modal-container">
			<div className="form-container">
				<form onSubmit={handleSubmit}>
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
						<label htmlFor="odds">
							Odds: &#40;if negative, enter negative number&#41;
						</label>
						<input
							type="number"
							id="odds"
							value={bet.odds}
							onChange={handleChange}
							onBlur={calculateReturn}
							required
						/>
					</div>
					<div className="bet-parameter">
						<label htmlFor="wager">Wager: </label>
						<input
							type="number"
							id="wager"
							value={bet.wager}
							onChange={handleChange}
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
						<textarea name="notes" id="notes" cols="30" rows="6"></textarea>
					</div>
					<div className="calculated-field">
						<p className="pot-return">
							Potential return: $
							<span className="win-value" value={bet.pot_win}>
								{betReturn}
							</span>
						</p>
					</div>
					<button type="submit">Add Bet</button>
				</form>
			</div>
		</div>
	);
}

export default CreateModal;