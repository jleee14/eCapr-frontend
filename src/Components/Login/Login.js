import React, { useState } from "react";
import { Link } from "react-router-dom";

function Login(props) {
	const initialFormData = {
		username: "",
		password: "",
	};
	const [formData, setFormData] = useState(initialFormData);

	function handleChange(event) {
		setFormData({ ...formData, [event.target.id]: event.target.value });
	}

	function handleLogin(event) {
        event.preventDefault();
		setError(false);
		try {
			const response = await fetch(API_URL + 'token/login/', {
				method: 'POST',
				body: JSON.stringify(formData),
				headers: {
					'Content-Type': 'application/json',
				},
			});

			if (response.status === 200) {
				const data = await response.json();
				handleSetLoggedIn(data.auth_token);
				navigate('/');
			} else if (response.status === 400) {
				setError(true);
			}
		} catch (error) {}
    }
    function handleSetLoggedIn(auth_token) {
        localStorage.setItem(formData.username, auth_token)
    }
	return (
		<div className="login-container">
			<div className="login-form-container">
				<form onSubmit={handleLogin}>
					<label htmlFor="username">Username: </label>
					<input type="text" id="username" onChange={handleChange} />
					<label htmlFor="password">Password: </label>
					<input type="password" id="password" required />
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
