import React from "react";
import { Link } from "react-router-dom";

function Home(props) {
	return (
		<div className="home-container">
			<div className="title-container">
				<h2 className="title-header">eCapr</h2>
			</div>
			<div className="subtext-container">
				<p className="subtext-header">
					Find your favorite cappers. Copy them. Build your network. Blah.
				</p>
			</div>
		</div>
	);
}

export default Home;
