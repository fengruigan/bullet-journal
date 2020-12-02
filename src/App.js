import { Layout } from "antd";
import moment from "moment";
import React, { useState, useEffect, useMemo } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MyCalendar from "./components/calendar/calendar";
import Journal from "./components/journal/journal";
import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";
import "./css/App.css";
import useSaveManager from "./util/useSaveManager";
import { UserContext } from "./contexts/UserContext";
import { login } from "./util/userLogin";

const { Content } = Layout;

const APP = () => {
	// currentDate will keep track of the date state of the whole APP for use in Sidebar and Calendar
	let [currentDate, setCurrentDate] = useState(moment());
	let [user, setUser] = useState(null);

	let signedInUser = useMemo(() => {
		return { user, setUser };
	}, [user, setUser]);

	useEffect(() => {
		const userLogin = async () => {
			let loggedIn = await login();
			setUser(loggedIn);
		};
		// initialize localStorage
		localStorage.setItem("journalTemp", JSON.stringify([]));
		localStorage.setItem("categoryTemp", JSON.stringify([]));
		localStorage.setItem("saveTime", 5);
		localStorage.setItem("saveTimer", null);
		localStorage.setItem("saveTimeout", null);
		// This will be moved to login page
		userLogin();
	}, []);

	let [setSaving] = useSaveManager();
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
					<Layout>
						<Sidebar currentDate={currentDate} />
						<Content style={{ padding: 24 }}>
							<Switch>
								<Route path="/:user/calendar">
									<MyCalendar
										resetDate={resetDate}
										currentDate={currentDate}
										onRedirect={onDateChange}
									/>
								</Route>
								<Route
									path="/:user/:date"
									// render={(props) => <Journal {...props} />}
									render={() => (
										<Journal
											// saving={saving}
											setSaving={setSaving}
											currentDate={currentDate}
											onRedirect={onDateChange}
										/>
									)}
								/>
								<Route
									path="/"
									// This will be the landing page
									// render={(props) => <Journal {...props} />}
									render={() => (
										<Journal
											// saving={saving}
											setSaving={setSaving}
											currentDate={currentDate}
											onRedirect={onDateChange}
										/>
									)}
								/>
							</Switch>
						</Content>
					</Layout>
				</Layout>
			</Router>
		</UserContext.Provider>
	);
};

export default APP;
