import "./App.css";
import React, { useState, useEffect } from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import Home from "./Components/Home/Home";
import MyDashboard from "./Components/MyDashboard/MyDashboard";
import MyBets from "./Components/MyBets/MyBets";
import Login from "./Components/Login/Login";
import Signup from "./Components/Signup/Signup";

function App() {
	const [loggedIn, setLoggedIn] = useState(false);
	function getUserInfo() {
		return;
	}
	function handleSetLoggedIn(auth_token) {
		localStorage.setItem("token", auth_token);
		setLoggedIn(true);
	}
	return (
		<>
			<div className="nav-container">Nav Container</div>
			<div className="main-container">
				<main>
					<Routes>
						<Route path="/home" element={<Home />} />
						<Route path="/" element={<Navigate to="/home" />} />
						<Route path="/dashboard" element={<MyDashboard />} />
						<Route path="/bets" element={<MyBets />} />
						<Route
							path="/login"
							element={<Login handleSetLoggedIn={handleSetLoggedIn} />}
						/>
						<Route path="/signup" element={<Signup />} />
					</Routes>
				</main>
			</div>
		</>
	);
}

export default App;
