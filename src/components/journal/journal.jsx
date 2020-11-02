import React, { useState, useEffect } from "react";
import CreateTask from "./createTask";
import Emoji from "../emoji";
import { LoadingOutlined } from "@ant-design/icons";
import { Empty, List } from "antd";
import "../../css/journal/journal.css";

const Journal = ({ currentDate }) => {
	let [todos, setTodos] = useState({ data: [], loading: true });

	// This is be used to fetch user list from database
	useEffect(() => {
		const fetchData = async () => {
			let date = currentDate.format("yyyy-MM-DD");
			const response = await fetch("http://localhost:8000/api/" + date);
			let json;
			try {
				json = await response.json();
			} catch {
				json = [];
			}
			setTodos({ data: json, loading: false });
		};
		fetchData();
	}, [currentDate]);

	// takes data and renders the list
	const generateList = () => {
		if (todos.data === null || todos.data.length === 0) {
			return <Empty />;
		} else {
			return (
				<List
					dataSource={todos.data}
					renderItem={(item) => (
						<List.Item>
							<List.Item.Meta
								avatar={<Emoji symbol={item.type} />}
								description={item.content}
							/>
						</List.Item>
					)}
				></List>
			);
		}
	};

	const addToList = (item) => {
		// let list = [...todos.data];
		// let json = JSON.stringify({ data: item });
		// fetch("http://localhost:8000/api", {
		// 	method: "POST",
		// 	headers: {
		// 		"Content-Type": "application/json",
		// 	},
		// 	body: json,
		// });
		// let listItem = { content: item };
		let list = [...todos.data, item];
		setTodos({ data: list, loading: false });
		console.log("posting " + item);
	};

	const handleClick = () => {
		console.log("input clicked");
	};

	return (
		<div className="journal">
			<h1 className="date">{currentDate.format("ddd MMM. DD, yyyy")}</h1>
			<hr className="wide-divider" />
			<div className="todo-list">
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
					generateList()
				)}
			</div>

			{/* This may be renamed into something else */}
			{/* <form
				onSubmit={(e) => {
					e.preventDefault();
					// handleSubmit();
					// addToList("hi");
					// console.log("form submitted");
				}}
			> */}
			<CreateTask handleClick={handleClick} onSubmit={addToList} />
			{/* </form> */}

			{/* Currently I am thinking of building one large list instead of two */}

			{/* <div className="divider"></div>
			<div className="general-list">
				<h5>Note</h5>
			</div> */}
		</div>
	);
};

export default Journal;
