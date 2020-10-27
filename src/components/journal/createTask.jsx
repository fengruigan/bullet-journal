import React, { Fragment, useState } from "react";
import { SettingOutlined, SmileFilled, PlusOutlined } from "@ant-design/icons";
import { Input, Popover, Card, Tooltip } from "antd";
import "../../css/journal/createTask.css";

// This is the list of LIST types users can create. Later on this will be fetched from user data
const types = [
	{ content: "Todo", icon: <SmileFilled /> },
	{ content: "Thought", icon: <SettingOutlined /> },
	{ content: "Note", icon: <SmileFilled /> },
	{ content: "Miscellaneous", icon: <SettingOutlined /> },
	{ content: "Misc.", icon: <SettingOutlined /> },
];

const CreateTask = () => {
	// Sets the state for the input, I might need a reducer
	let [type, setType] = useState(<SmileFilled />);

	// content to go into the popover
	const popContent = (
		<Card>
			{/* The list of LIST types */}
			{types.map((item, index) => {
				return (
					<Card.Grid
						className="type-grid"
						key={index}
						onClick={() => {
							setType(item.icon);
						}}
					>
						<Tooltip
							title={item.content}
							placement={"top"}
							arrowPointAtCenter={true}
						>
							<div style={{ fontSize: "1.3em", marginBottom: 0 }}>
								{item.icon}
							</div>
						</Tooltip>
						<p className="type-description">{item.content}</p>
					</Card.Grid>
				);
			})}
			{/* This will be the new type button */}
			<Card.Grid className="type-grid">
				<Tooltip title={"Add new tag"} placement={"top"}>
					<div className="type-new">
						<PlusOutlined />
					</div>
				</Tooltip>
			</Card.Grid>
		</Card>
	);

	const listType = (
		<Popover content={popContent} trigger={"click"} placement={"bottom"}>
			{type}
		</Popover>
	);

	// The input field for creating new LIST
	return (
		<Fragment>
			<Input
				addonBefore={listType}
				placeholder="Jot down your note here"
			/>
		</Fragment>
	);
};

export default CreateTask;
