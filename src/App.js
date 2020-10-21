import React, { Component } from "react";
import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";
import Journal from "./components/journal/journal";
import MyCalendar from "./components/calendar/calendar";
import moment from "moment";
import { Layout } from "antd";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./css/App.css";

const { Content } = Layout;

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
					<Navbar collapsed={false} resetDate={this.resetDate} />
					<Navbar collapsed={true} resetDate={this.resetDate} />
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
									render={(props) => <Journal {...props} />}
								/>
								<Route
									path="/"
									render={(props) => <Journal {...props} />}
								/>
							</Switch>
						</Content>
					</Layout>
				</Layout>
			</Router>
		);
	}
}

export default APP;
