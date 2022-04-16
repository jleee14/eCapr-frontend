import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home(props) {
	return (
		<>
			<div className="home-header-container">
				<div className="logo-container">
					<h2 className="logo-home">eCapr</h2>
				</div>
				<div className="login-signup-container">
					<Link to="/login">
						<button className="home-button" id="login">
							Login
						</button>
					</Link>
					<Link to="/signup">
						<button className="home-button" id="signup">
							Sign Up
						</button>
					</Link>
				</div>
			</div>
			<div className="home-container">
				<div className="home-image-container">Image placeholder</div>
				<div className="home-blurb-container">
					<div className="title-container">
						<h2 className="title-header">
							The Future of Social Sports Betting Is Here.
						</h2>
					</div>
					<div className="subtext-container">
						<p className="subtext-header">
							Find your favorite cappers. Copy them. Build your network. Blah.
						</p>
					</div>
				</div>
			</div>
		</>
	);
}

export default Home;
