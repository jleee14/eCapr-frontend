import React, { useState } from "react";
import API_URL from "../../apiConfig";
import { useNavigate, Link } from "react-router-dom";

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
				}, 3000);
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
				{success && (
					<div className="sucess-signup">
						{" "}
						Success! Welcome to eCapr! You will be redirected shortly. Please
						click this <Link to="/dashboard">link</Link> if you are not
						redirected.{" "}
					</div>
				)}
				{serverError && (
					<div className="server-error-signup">
						Oops! Something went wrong! Please try again later.
					</div>
				)}
				<button type="submit">Sign Up</button>
			</form>
		</div>
	);
}

export default Signup;
