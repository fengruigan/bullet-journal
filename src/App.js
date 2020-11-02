import { Layout } from "antd";
import moment from "moment";
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MyCalendar from "./components/calendar/calendar";
import Journal from "./components/journal/journal";
import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";
import "./css/App.css";

const { Content, Footer } = Layout;

class APP extends Component {
	state = {
		// currentDate will keep track of the date state of the whole APP for use in Sidebar and Calendar
		currentDate: moment(),
	};

	// This function is called when the date state is changed. Called from MyCalendar
	onDateChange = (selectedDate) => {
		this.setState({ currentDate: selectedDate });
	};

	// This function is called when date state is reset. Called from MyCalendar and Navbar
	resetDate = () => {
		this.setState({ currentDate: moment() });
	};

	render() {
		return (
			<Router>
				<Layout>
					<Navbar
						collapsed={false}
						resetDate={this.resetDate}
						currentDate={this.state.currentDate}
					/>
					<Navbar
						collapsed={true}
						resetDate={this.resetDate}
						currentDate={this.state.currentDate}
					/>
					<Layout>
						<Sidebar currentDate={this.state.currentDate} />
						<Content style={{ padding: 24 }}>
							<Switch>
								<Route path="/calendar">
									<MyCalendar
										resetDate={this.resetDate}
										currentDate={this.state.currentDate}
										onRedirect={this.onDateChange}
									/>
								</Route>
								<Route
									path="/:date"
									// render={(props) => <Journal {...props} />}
									render={() => (
										<Journal
											currentDate={this.state.currentDate}
										/>
									)}
								/>
								<Route
									path="/"
									// render={(props) => <Journal {...props} />}
									render={() => (
										<Journal
											currentDate={this.state.currentDate}
											onRedirect={this.onDateChange}
										/>
									)}
								/>
							</Switch>
						</Content>
					</Layout>
					<Footer
						style={{
							textAlign: "center",
							backgroundColor: "white",
						}}
					>
						Fengrui Gan ©2020
					</Footer>
				</Layout>
			</Router>
		);
	}
}

export default APP;
