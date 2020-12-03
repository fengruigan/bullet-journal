import React, { useState, useEffect, useContext } from "react";
import InputField from "./inputField";
import Emoji from "../emoji";
import {
	LoadingOutlined,
	LeftOutlined,
	RightOutlined,
	EllipsisOutlined,
} from "@ant-design/icons";
import {
	Empty,
	List,
	Button,
	Col,
	Row,
	Typography,
	Dropdown,
	Menu,
} from "antd";
import "../../css/journal/journal.css";
import { ReactComponent as NetwrokError } from "../../custom/icons/network_error.svg";
import { ReactComponent as EmptyCurrent } from "../../custom/icons/empty_current.svg";
import { ReactComponent as EmptyPast } from "../../custom/icons/empty_past.svg";
import moment from "moment";
import { UserContext } from "../../contexts/UserContext";

const Journal = ({ apiUrl, currentDate, onRedirect, setSaving }) => {
	// This is the data that will be rendered as a list on the page
	let [list, setList] = useState({ data: [], loading: true });
	// This keeps track of the server status, help with conditional rendering different situations
	let [serverStatus, setServerStatus] = useState(500);

	let { user } = useContext(UserContext);

	// This is be used to fetch user list from database
	useEffect(() => {
		setList({ data: [], loading: true });
		const fetchData = async () => {
			let urlDate = currentDate.format("yyyy-MM-DD");
			let response;
			try {
				response = await fetch(
					`${apiUrl}${user.username}/journals/${urlDate}`
				);
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
	}, [apiUrl, currentDate, user]);

	const setLocalStorage = (postItem) => {
		postItem.data.date = currentDate.format("yyyy-MM-DD");
		let storage = localStorage.journalTemp
			? JSON.parse(localStorage.journalTemp)
			: [];
		let newJournalTemp = [...storage, postItem];
		localStorage.setItem("journalTemp", JSON.stringify(newJournalTemp));
		setSaving(true);
		localStorage.setItem("saveTime", 5);
	};

	// This function creates new list item from input field
	const onCreate = (item) => {
		// update page
		let newList = [...list.data, item];
		setList({ data: newList, loading: false });

		// store to localStorage
		let postItem = {
			action: "POST",
			user: "user",
			contentType: "journal",
			data: { ...item },
		};
		setLocalStorage(postItem);
	};

	const onModify = (index, item) => {
		// update page
		let lst = [...list.data];
		item.hasOwnProperty("completed")
			? (lst[index].completed = !lst[index].completed)
			: (lst[index].crossed = !lst[index].crossed);
		setList({ data: lst, loading: false });

		// push to local storage
		let postItem = {
			action: "PUT",
			target: index,
			user: "user",
			contentType: "journal",
			data: { ...lst[index] },
		};
		setLocalStorage(postItem);
	};

	const onDelete = (index) => {
		// update page
		let lst = [...list.data].filter((el, idx) => {
			return idx === index ? null : el;
		});
		setList({ data: lst, loading: false });

		// push to localStorage
		let postItem = {
			action: "DELETE",
			target: index,
			user: "user",
			contentType: "journal",
			data: {},
		};
		setLocalStorage(postItem);
	};

	// This is the actions of the list items
	// This also need to post to database
	const listAction = (item, index) => {
		return (
			<Menu>
				{item.hasOwnProperty("completed") ? (
					<Menu.Item
						key={"1"}
						onClick={() => {
							onModify(index, item);
						}}
					>
						{item.completed ? (
							<div>Incomplete</div>
						) : (
							<div>Completed</div>
						)}
					</Menu.Item>
				) : (
					<Menu.Item
						key={"1"}
						onClick={() => {
							onModify(index, item);
						}}
					>
						{item.crossed ? (
							<div>Revert</div>
						) : (
							<div>Cross out</div>
						)}
					</Menu.Item>
				)}
				<Menu.Item
					key={"2"}
					onClick={() => {
						onDelete(index);
					}}
				>
					<div>Delete</div>
				</Menu.Item>
			</Menu>
		);
	};

	// This renders the header of the journal page
	const renderHeader = () => {
		return (
			<Row align="middle">
				{/* This is the "previous day" button, will be changed to previous journal */}
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
				{/* Shows journal date */}
				<Col span={14}>
					<Typography.Title id="date">
						{currentDate.format("ddd MMM. DD, yyyy")}
					</Typography.Title>
				</Col>
				{/* This is the "next day" button, will be changed to next journal
					This will only show when it has a next day to go to  */}
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
	};

	// takes data and renders the list
	const generateList = () => {
		if (list.data === null || list.data.length === 0) {
			if (serverStatus === 504) {
				return (
					<Empty
						className="empty"
						image={<NetwrokError />}
						description="Oops! There seems to a network error"
					/>
				);
			} else if (serverStatus === 404) {
				return (
					<Empty
						className="empty"
						image={<NetwrokError />}
						description="Not found"
					/>
				);
			} else {
				return moment().isSame(currentDate, "day") ? (
					<Empty
						className="empty"
						image={<EmptyCurrent />}
						description="List is still empty. Write something below."
					/>
				) : (
					<Empty
						className="empty"
						image={<EmptyPast />}
						description="Nothing on the list for this date"
					/>
				);
			}
		} else {
			return (
				<List
					dataSource={list.data}
					renderItem={(item, index) => (
						<List.Item
							key={index}
							actions={
								moment().isSame(currentDate, "day")
									? [
											<Dropdown
												overlay={listAction(
													item,
													index
												)}
												trigger="click"
											>
												<EllipsisOutlined />
											</Dropdown>,
									  ]
									: null
							}
						>
							<List.Item.Meta
								avatar={<Emoji symbol={item.category} />}
								description={
									<div
										className={
											item.completed || item.crossed
												? "crossed-out"
												: ""
										}
									>
										{item.content}
									</div>
								}
							/>
						</List.Item>
					)}
				></List>
			);
		}
	};

	return (
		<div className="journal">
			{renderHeader()}
			<hr className="wide-divider" />
			<div id="list">
				{list.loading ? (
					<LoadingOutlined id="loading-circle" />
				) : (
					generateList()
				)}
			</div>

			{/* This may be renamed into something else */}
			{moment().isSame(currentDate, "day") ? (
				<InputField onSubmit={onCreate} setSaving={setSaving} />
			) : null}
		</div>
	);
};

export default Journal;
