import React, { Component } from "react";
import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";
import Journal from "./components/journal/journal";
// import Calendar from "./components/calendar/calendar";
import { Layout, Calendar } from "antd";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";
import "./css/App.css";

const { Content } = Layout;

class APP extends Component {
	state = {
		// onSelectCalender: this.onSelectCalender.bind(this),
		redirect: [false, "#"],
	};
	onSelectCalender = (value) => {
		let dates = String(value._d).split(" ");
		let date = dates[0];
		for (let i = 1; i < 4; i++) {
			date = date + " " + dates[i];
		}
		let redirect = [true, date];
		this.setState({ redirect });
	};
	redirect(state) {
		if (state[0] === true) {
			return <Redirect to={"/" + state[1]} />;
		}
	}
	render() {
		return (
			<Router>
				<Layout>
					<Navbar collapsed={false} />
					<Navbar collapsed={true} />
					<Layout>
						<Sidebar />
						<Content style={{ padding: 24 }}>
							{this.redirect(this.state.redirect)}
							<Switch>
								<Route path="/calendar">
									<Calendar
										onSelect={this.onSelectCalender}
									/>
								</Route>
								<Route path="/:date" component={Journal} />
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
