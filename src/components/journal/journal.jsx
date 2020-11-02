import React, { useState, useEffect } from "react";
import InputField from "./inputField";
import Emoji from "../emoji";
import {
	LoadingOutlined,
	LeftOutlined,
	RightOutlined,
} from "@ant-design/icons";
import { Empty, List, Button, Col, Row, Typography, message } from "antd";
import "../../css/journal/journal.css";
import moment from "moment";

const Journal = ({ currentDate, onRedirect }) => {
	let [list, setList] = useState({ data: [], loading: true });

	// this temp array is to store the newly created list items that have yet to send to DB
	// and will be cleared as soon as the items are successfully sent
	let [temp, setTemp] = useState([]);

	// This is be used to fetch user list from database
	useEffect(() => {
		const fetchData = async () => {
			let urlDate = currentDate.format("yyyy-MM-DD");
			const response = await fetch(
				"http://localhost:8000/api/" + urlDate
			);
			if (response.ok) {
				console.log("fetched from DB");
			}
			let json;
			try {
				json = await response.json();
			} catch {
				json = [];
			}
			setList({ data: json, loading: false });
		};
		fetchData();
	}, [currentDate]);

	// This renders the header of the journal page
	const renderHeader = () => (
		<Row align="middle">
			<Col span={5}>
				<Button
					id="header-button-left"
					onClick={() => {
						let target = currentDate.subtract(1, "day");
						onRedirect(target.clone());
					}}
				>
					<LeftOutlined />
					Prev
				</Button>
			</Col>
			<Col span={14}>
				<Typography.Title id="date">
					{currentDate.format("ddd MMM. DD, yyyy")}
				</Typography.Title>
			</Col>
			<Col span={5}>
				{moment().isSame(currentDate, "day") ? null : (
					<Button
						id="header-button-right"
						onClick={() => {
							let target = currentDate.add(1, "day");
							onRedirect(target.clone());
						}}
					>
						Next <RightOutlined />
					</Button>
				)}
			</Col>
		</Row>
	);

	// takes data and renders the list
	const generateList = () => {
		if (list.data === null || list.data.length === 0) {
			return <Empty />;
		} else {
			return (
				<List
					dataSource={list.data}
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

	// This function creates new list item from input field
	const addToList = (item) => {
		// let list = [...list.data];
		// let json = JSON.stringify({ data: item });
		// fetch("http://localhost:8000/api", {
		// 	method: "POST",
		// 	headers: {
		// 		"Content-Type": "application/json",
		// 	},
		// 	body: json,
		// });
		// let listItem = { content: item };
		let newList = [...list.data, item];
		let newTemp = [...temp, item];
		setList({ data: newList, loading: false });
		setTemp(newTemp);
		console.log("posting " + item);
		// message.warning("Journal save failed", 0);
		let i = 5;
		let key = "save";
		const waitTimer = setInterval(() => {
			message.warning({
				content: "Retrying in " + i + " seconds",
				duration: 0,
				key,
			});
			i--;
			console.log("timer tick");
		}, 1000);
		setTimeout(() => {
			clearInterval(waitTimer);
			message.loading({ content: "Saving...", duration: 1, key });
		}, (i + 1) * 1000);
	};

	const handleClick = () => {
		console.log("input clicked");
	};

	return (
		<div className="journal">
			{renderHeader()}
			<hr className="wide-divider" />
			<div className="todo-list">
				{list.loading ? (
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
			<InputField handleClick={handleClick} onSubmit={addToList} />
		</div>
	);
};

export default Journal;
