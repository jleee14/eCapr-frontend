import "./App.css";
import React, { useState, useEffect, useContext } from "react";
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

function App() {
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
						<Route path="/login" element={<Login />} />
						{/* <Route path="/signup" element={<Signup />} /> */}
					</Routes>
				</main>
			</div>
		</>
	);
}

export default App;
