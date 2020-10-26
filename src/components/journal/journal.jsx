import React, { useState, useEffect } from "react";
import CreateTask from "./createTask";
import { LoadingOutlined, SettingOutlined } from "@ant-design/icons";
import { Empty, List } from "antd";
import "../../css/journal/journal.css";

const Journal = ({ currentDate }) => {
	let [todos, setTodos] = useState({ data: null, loading: true });

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
								avatar={<SettingOutlined />}
								description={item.content}
							/>
						</List.Item>
					)}
				></List>
			);
		}
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
			<CreateTask />
			{/* <div className="divider"></div>
			<div className="general-list">
				<h5>Note</h5>
			</div> */}
		</div>
	);
};

export default Journal;
