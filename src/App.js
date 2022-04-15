import "./App.css";
import React, { useState, useEffect } from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
	useNavigate,
} from "react-router-dom";
import Home from "./Components/Home/Home";
import MyDashboard from "./Components/MyDashboard/MyDashboard";
import MyBets from "./Components/MyBets/MyBets";
import Login from "./Components/Login/Login";
import Signup from "./Components/Signup/Signup";
import API_URL from "./apiConfig";
import Navbar from "./Components/Navbar/Navbar";

function App() {
	const navigate = useNavigate();
	const [loggedIn, setLoggedIn] = useState(false);
	const [userInfo, setUserInfo] = useState({});

	// async function getUserInfo() {
	// 	try {
	// 		const response = await fetch(API_URL + "users/me", {
	// 			headers: {
	// 				Authorization: `Token ${localStorage.getItem("token")}`,
	// 			},
	// 		});

	// 		if (response.status === 200) {
	// 			const data = await response.json();
	// 			setUserInfo(data);
	// 			console.log("fetch user info");
	// 		}
	// 	} catch (error) {
	// 		console.log("user data error");
	// 	}
	const handleLogout = async () => {
		// destroy token POST token/logout/
		try {
			const response = await fetch(API_URL + "token/logout/", {
				method: "POST",
				headers: {
					Authorization: `Token ${localStorage.getItem("token")}`,
				},
			});

			if (response.status === 204) {
				// set logged in to false
				setLoggedIn(false);
				// clear user data
				setUserInfo(null);
				// remove token from local storage
				localStorage.removeItem("token");
				alert("You have been logged out!");
				navigate("/login");
			}
		} catch (error) {
			console.log(error);
		}
		return;
	};

	async function handleSetLoggedIn(auth_token) {
		try {
			localStorage.setItem("token", auth_token);
			await setLoggedIn(true);
			const response = await fetch(API_URL + "users/me", {
				headers: {
					Authorization: `Token ${localStorage.getItem("token")}`,
				},
			});
			if (response.status === 200) {
				const data = await response.json();
				console.log("save local storage");
				localStorage.setItem("id", data.id);
			}
		} catch (error) {}
	}

	useEffect(() => {
		if (localStorage.getItem("token")) {
			setLoggedIn(true);
			console.log("ran app useEffect");
			// getUserInfo();
		}
	}, []);

	return (
		<>
			<div className="nav-container">
				<Navbar handleLogout={handleLogout} />
			</div>
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
