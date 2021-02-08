import React, { useState, useEffect, useMemo } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Layout } from "antd";
import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";
import LandingPage from "./components/landingPage";
import SignInPage from "./components/signInPage";
import SignUpPage from "./components/signUpPage";
import MyCalendar from "./components/calendar/calendar";
import Journal from "./components/journal/journal";
import useSaveManager from "./util/useSaveManager";
import { UserContext } from "./contexts/UserContext";
import moment from "moment";
import "./css/App.css";

const { Content } = Layout;

const APP = () => {
	// currentDate will keep track of the date state of the whole APP for use in Sidebar and Calendar
	let [currentDate, setCurrentDate] = useState(moment());
	let [user, setUser] = useState(null);

	const apiUrl = "http://localhost:8000/api/";

	let signedInUser = useMemo(() => {
		return { user, setUser };
	}, [user, setUser]);

	useEffect(() => {
		// initialize localStorage
		localStorage.setItem("journalTemp", JSON.stringify([]));
		localStorage.setItem("categoryTemp", JSON.stringify([]));
		localStorage.setItem("saveTime", 5);
		localStorage.setItem("saveTimer", null);
		localStorage.setItem("saveTimeout", null);
	}, []);

	let [setSaving] = useSaveManager(apiUrl);
	// will need a state for currentUser, maybe a context

	// This function is called when the date state is changed. Called from MyCalendar
	const onDateChange = (selectedDate) => {
		setCurrentDate(selectedDate);
	};

	// This function is called when date state is reset. Called from MyCalendar and Navbar
	const resetDate = () => {
		setCurrentDate(moment());
	};

	return (
		<UserContext.Provider value={signedInUser}>
			<Router>
				<Layout>
					<Navbar
						collapsed={false}
						resetDate={resetDate}
						currentDate={currentDate}
					/>
					<Navbar
						collapsed={true}
						resetDate={resetDate}
						currentDate={currentDate}
					/>

					<Switch>
						<Route
							path="/"
							exact
							render={() => <LandingPage apiUrl={apiUrl} />}
						/>

						<Route path="/sign-in">
							<SignInPage apiUrl={apiUrl} />
						</Route>

						<Route path="/sign-up">
							<SignUpPage apiUrl={apiUrl} />
						</Route>

						<Route path="/:user/calendar">
							<Layout>
								<Sidebar currentDate={currentDate} />
								<Content style={{ padding: 24 }}>
									<MyCalendar
										resetDate={resetDate}
										currentDate={currentDate}
										onRedirect={onDateChange}
									/>
								</Content>
							</Layout>
						</Route>

						<Route path="/:user/:date">
							<Layout>
								<Sidebar currentDate={currentDate} />
								<Content style={{ padding: 24 }}>
									<Journal
										apiUrl={apiUrl}
										setSaving={setSaving}
										currentDate={currentDate}
										onRedirect={onDateChange}
									/>
								</Content>
							</Layout>
						</Route>
					</Switch>
				</Layout>
			</Router>
		</UserContext.Provider>
	);
};

export default APP;
