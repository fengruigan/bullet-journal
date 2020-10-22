import React, { useState, useEffect } from "react";
// import CreateTask from "./createTask";
// import Todo from "./todo";
// import getDate from "../../util/getDate";
import "../../css/journal/journal.css";
import { LoadingOutlined } from "@ant-design/icons";

// class Journal extends Component {
const Journal = ({ currentDate }) => {
	let [todos, setTodos] = useState({ data: null, loading: true });

	useEffect(() => {
		const fetchData = async () => {
			let todoNum = Math.floor(Math.random() * 10 + 1);
			let temp = [];
			for (let i = 0; i < todoNum; i++) {
				let id = Math.floor(Math.random() * 200);
				const response = await fetch(
					"https://jsonplaceholder.typicode.com/todos/" + id
				);
				const json = await response.json();
				temp.push(json.title);
			}
			setTodos({ data: temp, loading: false });
		};
		fetchData();
	}, []);

	// renderDate = (match) => {
	// 	if (match !== undefined && match.params.date !== undefined) {
	// 		return getDate(match.params.date);
	// 	} else {
	// 		return getDate();
	// 	}
	// };
	return (
		<div className="journal">
			<h1 className="date">{currentDate.format("ddd MMM. DD, yyyy")}</h1>
			<hr className="wide-divider" />
			<div className="todo-list">
				<h5>Todos Today</h5>
				{todos.loading ? (
					<LoadingOutlined
						style={{
							display: "flex",
							justifyContent: "center",
							fontSize: "5em",
							color: "#69c0ff",
							marginBottom: "0.5em",
						}}
					/>
				) : (
					<ul>
						{todos.data.map((content, idx) => {
							return (
								<li key={idx} style={{ listStyle: "initial" }}>
									{content}
								</li>
							);
						})}
					</ul>
				)}
				{/* <Todo />
					<Todo />
					<Todo />
					<CreateTask /> */}
			</div>
			<div className="divider"></div>
			<div className="general-list">
				<h5>Note</h5>
			</div>
		</div>
	);
};

export default Journal;
