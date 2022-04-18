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
				<div className="home-content-container">
					<div className="home-image-container">
						<div className="image-container" id="first-image">
							<img src="https://i.imgur.com/b1xH0ON.png" alt="dash-screen" />
						</div>
						<div className="image-container" id="second-image">
							<img src="https://i.imgur.com/z5P6ZWY.png" alt="bet-screen" />
						</div>
					</div>
					<div className="home-blurb-container">
						<div className="title-container">
							<h2 className="title-header">
								Find your niche, exploit it. Profit.
							</h2>
						</div>
						<div className="subtext-container">
							<p className="subtext-header">
								eCapr provides integrated tooling and tracking for dedicated
								gamblers.
							</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Home;
