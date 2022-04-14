import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API_URL from "../../apiConfig";

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
				},
			});

			if (response.status === 200) {
				const data = await response.json();
				handleSetLoggedIn(data.auth_token);
				setTimeout(() => {
					navigate("/dashboard");
				}, 5000);
			} else if (response.status === 400) {
				setError(true);
			}
		} catch (error) {}
	}

	return (
		<div className="login-container">
			<div className="login-form-container">
				<form onSubmit={handleLogin}>
					<label htmlFor="username">Username: </label>
					<input type="text" id="username" onChange={handleChange} />
					<label htmlFor="password">Password: </label>
					<input
						type="password"
						id="password"
						onChange={handleChange}
						required
					/>
					<button type="submit">Log In</button>
				</form>
			</div>
			<div className="signup-container">
				<p>
					No existing account? Sign up <Link to="/sigup">here</Link>
				</p>
			</div>
		</div>
	);
}

export default Login;
