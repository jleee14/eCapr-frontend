import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API_URL from "../../apiConfig";
import "./Login.css";

function Login({ handleSetLoggedIn }) {
	const initialFormData = {
		username: "",
		password: "",
	};
	const [formData, setFormData] = useState(initialFormData);
	const [error, setError] = useState(false);
	const navigate = useNavigate();
	function handleChange(event) {
		setFormData({ ...formData, [event.target.id]: event.target.value });
	}

	async function handleLogin(event) {
		event.preventDefault();
		setError(false);
		try {
			const response = await fetch(API_URL + "token/login/", {
				method: "POST",
				body: JSON.stringify(formData),
				headers: {
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "*",
					"Access-Control-Allow-Methods": "POST,PATCH,OPTIONS",
				},
				mode: "no-cors",
			});

			if (response.status === 200) {
				const data = await response.json();
				handleSetLoggedIn(data.auth_token);
				setTimeout(() => {
					navigate("/dashboard");
				}, 2000);
			} else if (response.status === 400) {
				setError(true);
			}
		} catch (error) {}
	}

	return (
		<>
			<div className="home-header-container">
				<div className="logo-container">
					<h2 className="logo-home">eCapr</h2>
				</div>
			</div>
			<div className="login-container">
				<div className="login-form-container">
					<h2 className="login-header">Login</h2>
					<div className="form-form-container">
						<form id="login-form" onSubmit={handleLogin}>
							<label htmlFor="username">Username: </label>
							<input
								type="text"
								id="username"
								onChange={handleChange}
								placeholder="Username"
								required
							/>
							<label htmlFor="password">Password: </label>
							<input
								type="password"
								id="password"
								onChange={handleChange}
								placeholder="Password"
								required
							/>
							{error && (
								<p>
									Invalid user credentials. Please re-enter your username and
									password.
								</p>
							)}
							<button id="login-button" type="submit">
								Log In
							</button>
						</form>
					</div>
					<div className="signup-message-container">
						<p>
							No existing eCapr account? Sign up <Link to="/signup">here</Link>
						</p>
					</div>
				</div>
			</div>
		</>
	);
}

export default Login;
