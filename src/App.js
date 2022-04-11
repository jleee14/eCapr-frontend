import "./App.css";
import React from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";

function App() {
	return (
		<>
			<div className="nav-container">Hello world!!</div>
			<div className="main-container">
				<main>
					<Routes></Routes>
				</main>
			</div>
		</>
	);
}

export default App;
