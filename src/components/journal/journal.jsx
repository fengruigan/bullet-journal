import React, { Component } from "react";
// import CreateTask from "./createTask";
import Todo from "./todo";
import getDate from "../../util/getDate";
import "../../css/journal/journal.css";

class Page extends Component {
	state = {
		date: "1",
	};
	componentDidMount() {
		// if (Object.keys(this.props.match.params).length === 0) {
		// 	console.log("at home");
		// }
		// let date = getDate();
		// this.setState({ date });
	}
	renderDate = (params) => {
		if (params.date !== undefined) {
			return params.date;
		} else {
			return getDate();
		}
	};
	render() {
		return (
			<div className="journal">
				<h1 className="date">
					{this.renderDate(this.props.match.params)}
				</h1>
				<hr className="wide-divider" />
				<div className="todo-list">
					<h5>Todos Today</h5>
					<Todo />
					<Todo />
					<Todo />
					{/* <CreateTask /> */}
				</div>
				<div className="divider"></div>
				<div className="general-list">
					<h5>Note</h5>
				</div>
			</div>
		);
	}
}

export default Page;
