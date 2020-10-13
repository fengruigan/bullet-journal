import React, { Component } from "react";
import CreateTask from "./createTask";
import Todo from "./todo";
// import getDate from "../../util/getDate";
import "../../css/journal/journal.css";

class Page extends Component {
	state = {};
	componentDidMount() {
		console.log(this.props);
		// if (Object.keys(this.props.match.params).length === 0) {
		// 	console.log("at home");
		// }
	}
	render() {
		return (
			<div className="journal">
				<h1 className="date">{this.props.date}</h1>
				{/* <h1 className="date">Oct. 2, 2020</h1> */}
				<hr className="wide-divider" />
				<div className="todo-list">
					<h5>Todos Today</h5>
					<Todo />
					<Todo />
					<Todo />
					<CreateTask />
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
