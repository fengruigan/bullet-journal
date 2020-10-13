import React from "react";
import Navbar from "./components/navbar";
import Calendar from "./components/calendar/calendar";
import Journal from "./components/journal/journal";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./css/App.css";

function App() {
	return (
		<Router>
			<div className="App">
				<Navbar />
				<div className="container">
					<Switch>
						<Route path="/calendar">
							<Calendar />
						</Route>
						<Route path="/">
							<Journal />
						</Route>
					</Switch>
				</div>
			</div>
		</Router>
	);
}

export default App;
