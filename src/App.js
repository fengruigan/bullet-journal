import React from "react";
import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";
import Journal from "./components/journal/journal";
// import Calendar from "./components/calendar/calendar";
import { Layout, Calendar } from "antd";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./css/App.css";

const { Content } = Layout;

function App() {
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
								<Calendar
									onSelect={(value) => {
										console.log(value._d);
									}}
								/>
							</Route>
							<Route path="/" component={Journal} />
							{/* <Route path="/calendar" component={Calendar} />
							<Route path="/" component={Journal} /> */}
						</Switch>
					</Content>
				</Layout>
			</Layout>
		</Router>
	);
}

export default App;
