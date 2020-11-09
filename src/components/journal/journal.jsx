import React, { useState, useEffect, useRef } from "react";
import InputField from "./inputField";
import Emoji from "../emoji";
import {
	LoadingOutlined,
	LeftOutlined,
	RightOutlined,
} from "@ant-design/icons";
import { Empty, List, Button, Col, Row, Typography, message } from "antd";
import "../../css/journal/journal.css";
import { ReactComponent as NetwrokError } from "../../custom/icons/network_error.svg";
import { ReactComponent as EmptyCurrent } from "../../custom/icons/empty_current.svg";
import { ReactComponent as EmptyPast } from "../../custom/icons/empty_past.svg";
import moment from "moment";

const Journal = ({ currentDate, onRedirect }) => {
	let [list, setList] = useState({ data: [], loading: true });
	let [serverStatus, setServerStatus] = useState(500);

	// this temp array is to store the newly created list items that have yet to send to DB
	// and will be cleared as soon as the items are successfully sent
	let [temp, setTemp] = useState([]);
	const key = "save";
	let saveWaitRef = useRef(5);
	let saveRetryRef = useRef({ timer: null, timeout: null });
	// This is be used to fetch user list from database
	useEffect(() => {
		const fetchData = async () => {
			let urlDate = currentDate.format("yyyy-MM-DD");
			let response;
			try {
				response = await fetch("http://localhost:8000/api/" + urlDate);
			} catch {
				response = null;
				setServerStatus(504); // Marking connection error
			}
			if (response && response.status) {
				setServerStatus(response.status);
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

	// This is used to post new list item to database
	useEffect(() => {
		if (temp.length !== 0) {
			let json = JSON.stringify(temp);
			const postData = async () => {
				message.loading({ content: "Saving...", duration: 0, key });
				let response;
				try {
					response = await fetch("http://localhost:8000/api/", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: json,
					});
				} catch {
					response = null;
				}
				if (response && response.ok) {
					message.success({
						content: "Journal Saved!",
						duration: 3,
						key,
					});
					saveWaitRef.current = 5;
					setTemp([]);
				} else {
					// wait for some amount of time then retry
					if (saveRetryRef.current.timer) {
						clearInterval(saveRetryRef.current.timer);
						clearTimeout(saveRetryRef.current.timeout);
					}
					let tic = saveWaitRef.current;
					saveWaitRef.current = Math.floor(tic * 1.5);
					saveRetryRef.current.timer = setInterval(() => {
						message.warning({
							content:
								"Saving failed. Retrying in " +
								tic +
								" seconds...",
							duration: 0,
							key,
						});
						tic--;
					}, 1000);
					saveRetryRef.current.timeout = setTimeout(() => {
						let refresh = [...temp];
						setTemp(refresh);
						clearInterval(saveRetryRef.current.timer);
						saveRetryRef.current = { timer: null, timeout: null };
					}, (tic + 1) * 1000);
				}
			};
			postData();
		}
	}, [temp, setTemp]);

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
				{moment().isSameOrBefore(currentDate, "day") ? null : (
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
			if (serverStatus === 504) {
				return (
					<Empty
						image={<NetwrokError />}
						description="Oops! There seems to a network error"
					/>
				);
			} else if (serverStatus === 404) {
				return (
					<Empty image={<NetwrokError />} description="Not found" />
				);
			} else {
				return moment().isSame(currentDate, "day") ? (
					<Empty
						image={<EmptyCurrent />}
						description="List is still empty. Write something below."
					/>
				) : (
					<Empty
						image={<EmptyPast />}
						description="Nothing on the list for this date"
					/>
				);
			}
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
		let postItem = { ...item };
		postItem.date = currentDate.format("yyyy-MM-DD");
		let newList = [...list.data, item];
		let newTemp = [...temp, postItem];
		setList({ data: newList, loading: false });
		setTemp(newTemp);
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
			{moment().isSame(currentDate, "day") ? (
				<InputField onSubmit={addToList} />
			) : null}
		</div>
	);
};

export default Journal;
