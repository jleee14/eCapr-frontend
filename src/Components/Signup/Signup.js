import React, { useState } from "react";
import API_URL from "../../apiConfig";
import { useNavigate, Link } from "react-router-dom";
import "./Signup.css";

function Signup(props) {
	const initialForm = {
		email: "",
		username: "",
		password: "",
		re_password: "",
	};

	const navigate = useNavigate();
	const [formData, setFormData] = useState(initialForm);
	const [error, setError] = useState(false);
	const [success, setSuccess] = useState(false);
	const [signupErrors, setSignupErrors] = useState([]);
	const [serverError, setServerError] = useState(false);
	function handleChange(event) {
		setFormData({ ...formData, [event.target.id]: event.target.value });
	}
	async function handleSignup(event) {
		event.preventDefault();
		setSignupErrors([]);
		setError(false);
		setServerError(false);
		try {
			const response = await fetch(API_URL + "users/", {
				method: "POST",
				body: JSON.stringify(formData),
				headers: {
					"Content-Type": "application/json",
				},
			});
			if (response.status === 201) {
				setSuccess(true);
				setTimeout(() => {
					navigate("/login");
				}, 3500);
			} else if (response.status === 400) {
				const data = await response.json();
				const errors = [];
				for (const error in data) {
					errors.push(data[error]);
				}
				setSignupErrors(errors);
			} else {
				setServerError(true);
			}
		} catch (error) {
			setServerError(true);
		}
		return;
	}
	return (
		<>
			<div className="home-header-container">
				<div className="logo-container">
					<h2 className="logo-home">eCapr</h2>
				</div>
			</div>
			<div className="signup-container">
				<div className="signup-form-container">
					<h2 className="signup-message">Sign Up for eCapr</h2>
					<div className="form-form-container">
						<form id="signup-form" onSubmit={handleSignup}>
							<label htmlFor="email">Email: </label>
							<input
								type="email"
								id="email"
								onChange={handleChange}
								placeholder="Email"
								required
							/>
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
							<label htmlFor="re_password">Re-enter password: </label>
							<input
								type="password"
								id="re_password"
								onChange={handleChange}
								placeholder="Re-enter password"
								required
							/>
							{success && (
								<div className="success-signup">
									{" "}
									Success! Welcome to eCapr! You will be redirected shortly.
									Please click this <Link to="/dashboard">link</Link> if you are
									not redirected.{" "}
								</div>
							)}
							{serverError && (
								<div className="server-error-signup">
									Oops! Something went wrong! Please try again later.
								</div>
							)}
							{signupErrors && (
								<div className="signup-error-container">
									{signupErrors.map((errormsg) => (
										<p className="signup-error-msg">{errormsg}</p>
									))}
								</div>
							)}
							<button className="signup-button" type="submit">
								Sign Up
							</button>
						</form>
					</div>
				</div>
			</div>
		</>
	);
}

export default Signup;
