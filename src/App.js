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
import API_URL from "./apiConfig";

function App() {
	const [loggedIn, setLoggedIn] = useState(false);
	const [userInfo, setUserInfo] = useState({});

	async function getUserInfo() {
		try {
			const response = await fetch(API_URL + "users/me", {
				headers: {
					Authorization: `Token ${localStorage.getItem("token")}`,
				},
			});

			if (response.status === 200) {
				const data = await response.json();
				setUserInfo(data);
				console.log("fetch user info");
			}
		} catch (error) {
			console.log("user data error");
		}
	}
	function handleSetLoggedIn(auth_token) {
		localStorage.setItem("token", auth_token);
		setLoggedIn(true);
	}

	useEffect(() => {
		if (localStorage.getItem("token")) {
			setLoggedIn(true);
			console.log("ran app useEffect");
			getUserInfo();
		}
	}, []);

	return (
		<>
			<div className="nav-container">Nav Container</div>
			<div className="main-container">
				<main>
					<Routes>
						<Route path="/home" element={<Home />} />
						<Route path="/" element={<Navigate to="/home" />} />
						<Route
							path="/dashboard"
							element={<MyDashboard userid={userInfo.id} />}
						/>
						<Route path="/bets" element={<MyBets userid={userInfo.id} />} />
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
