import React, { Component } from "react";
import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";
import Journal from "./components/journal/journal";
import MyCalendar from "./components/calendar/calendar";
import { Layout } from "antd";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	// Redirect,
} from "react-router-dom";
import "./css/App.css";

const { Content } = Layout;

class APP extends Component {
	state = {};
	render() {
		return (
			<Router>
				<Layout>
					<Navbar collapsed={false} />
					<Navbar collapsed={true} />
					<Layout>
						<Sidebar />
						<Content style={{ padding: 24 }}>
							<Switch>
								<Route path="/calendar">
									<MyCalendar />
								</Route>
								<Route
									path="/:date"
									render={(props) => <Journal {...props} />}
								/>
								<Route path="/" component={Journal} />
							</Switch>
						</Content>
					</Layout>
				</Layout>
			</Router>
		);
	}
}

export default APP;

// function App() {
// 	return (
// 		<Router>
// 			<Layout>
// 				<Navbar collapsed={false} />
// 				<Navbar collapsed={true} />
// 				<Layout>
// 					<Sidebar />
// 					<Content style={{ padding: 24 }}>
// 						<Switch>
// 							<Route path="/calendar">
// 								<Calendar onSelect={this.onSelectCalender}/>
// 							</Route>
// 							<Route path="/" component={Journal} />
// 							{/* <Route path="/calendar" component={Calendar} />
// 							<Route path="/" component={Journal} /> */}
// 						</Switch>
// 					</Content>
// 				</Layout>
// 			</Layout>
// 		</Router>
// 	);
// }

// export default App;
