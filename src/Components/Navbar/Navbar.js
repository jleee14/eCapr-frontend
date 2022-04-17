import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

function Navbar({ handleLogout, userInfo }) {
	const [isExtended, setIsExtended] = useState(false);
	function extendNav(event) {
		setIsExtended(!isExtended);
	}
	return (
		<div
			className={isExtended ? "nav-stretch-container" : "nav-container"}
			id="position-nav"
		>
			{isExtended && (
				<div className="stretch-logo-container animate__animated animate__fadeIn">
					eCapr
				</div>
			)}
			<div
				className={isExtended ? "open-extended-button" : "open-button"}
				onClick={extendNav}
			>
				{isExtended ? (
					<i class="fa-solid fa-angles-left"></i>
				) : (
					<i class="fa-solid fa-angles-right"></i>
				)}
			</div>
			{isExtended && (
				<div className="user-container animate__animated animate__fadeIn">
					<div className="circle-container">
						Welcome, <br />
						{userInfo.username}
					</div>
					<button className="logout-container" onClick={handleLogout}>
						Logout
					</button>
				</div>
			)}
			<div className="links-container animate__animated animate__fadeIn">
				<Link to="/dashboard">
					<div className="link-container">
						{isExtended ? (
							"MyDashboard"
						) : (
							<div className="short-link-container">
								<i className="fa-solid fa-chart-line"></i>
								<div className="small-text-container">Dashboard</div>
							</div>
						)}
					</div>
				</Link>
				<Link to="/bets">
					<div className="link-container">
						{isExtended ? (
							"MyBets"
						) : (
							<div className="short-link-container">
								<i class="fa-solid fa-money-check-dollar"></i>
								<div className="small-text-container">Bets</div>
							</div>
						)}
					</div>
				</Link>
				{!isExtended && (
					<div className="link-container" onClick={handleLogout}>
						<div className="short-link-container">
							<i class="fa-solid fa-right-from-bracket"></i>
							<div className="small-text-container">Logout</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default Navbar;
