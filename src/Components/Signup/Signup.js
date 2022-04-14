import React, { useState } from "react";
import API_URL from "../../apiConfig";

function Signup(props) {
	const initialForm = {
		email: "",
		username: "",
		password: "",
		re_password: "",
	};

	const [formData, setFormData] = useState(initialForm);
	const [error, setError] = useState(false);
	const [success, setSuccess] = useState(false);
	function handleChange(event) {
		setFormData({ ...formData, [event.target.id]: event.target.value });
	}
	function handleSignup(event) {
		event.preventDefault();
		setSignupErrors([]);
		setError(false);
		setServerError(false);
		try {
			const response = await fetch(API_URL + 'users/', {
				method: 'POST',
				body: JSON.stringify(formData),
				headers: {
					'Content-Type': 'application/json',
				},
			});
			if (response.status === 201) {
				// user was created
				setSuccess(true);
				// redirect to login
				setTimeout(() => {
					navigate('/login');
				}, 5000);
			} else if (response.status === 400) {
				// status 400 -- something bad about the request
				// let user know what's wrong with their signup
				const data = await response.json();
				const errors = [];
				for (const error in data) {
					errors.push(data[error]);
				}

				setSignupErrors(errors);
			} else {
				// set error to true
				setServerError(true);
			}
			console.log(response);
		} catch (error) {
			console.log(error);
			setServerError(true);
		}
		return;
	}
	return (
		<div className="signup-container">
			<h3>Sign up for eCapr</h3>
			<form onSubmit={handleSignup}>
				<label htmlFor="email">Email: </label>
				<input type="email" id="email" onChange={handleChange} required />
				<label htmlFor="username"></label>
				<input type="text" id="username" onChange={handleChange} required />
				<label htmlFor="password">Password: </label>
				<input type="password" id="password" onChange={handleChange} required />
				<label htmlFor="re_password">Re-enter password: </label>
				<input
					type="password"
					id="re_password"
					onChange={handleChange}
					required
				/>
				<button type="submit">Sign Up</button>
			</form>
		</div>
	);
}

export default Signup;
