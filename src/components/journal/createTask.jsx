import React, { Fragment, useState } from "react";
import { SettingOutlined, SmileFilled, PlusOutlined } from "@ant-design/icons";
import { Input, Popover, Card, Tooltip, Form, Button } from "antd";
import Emoji from "../emoji";
import "../../css/journal/createTask.css";

// This is the list of LIST types users can create. Later on this will be fetched from user data
const types = [
	{ content: "Todo", icon: <SmileFilled />, emoji: "✅" },
	{
		content: "Thought",
		icon: <SettingOutlined />,
		emoji: <Emoji symbol={"🤓"} />,
	},
	{ content: "Note", icon: <SmileFilled />, emoji: "✏️" },
	{
		content: "Miscellaneous",
		icon: <SettingOutlined />,
		emoji: "🧸",
	},
	{
		content: "Misc.",
		icon: <SettingOutlined />,
		emoji: "📌",
	},
];

const CreateTask = ({ handleClick, onSubmit }) => {
	// Sets the state for the input, I might need a reducer
	let [type, setType] = useState("✅");
	const [form] = Form.useForm();

	const onReset = () => {
		form.resetFields();
	};

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
							setType(item.emoji);
						}}
					>
						<Tooltip
							title={item.content}
							placement={"top"}
							arrowPointAtCenter={true}
						>
							<div style={{ fontSize: "1.3em", marginBottom: 0 }}>
								{item.emoji}
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
			<span style={{ padding: "0", fontSize: "1.5em" }}>
				<Emoji symbol={type} />
			</span>
		</Popover>
	);

	// The input field for creating new LIST
	return (
		<Fragment>
			<Form
				form={form}
				onFinish={(values) => {
					let json = { ...values };
					json.type = type;
					onSubmit(json);
					onReset();
					console.log(json);
				}}
			>
				<Form.Item name="content">
					<Input
						size="large"
						onClick={() => {
							handleClick();
						}}
						onSubmit={() => {
							console.log("hi");
						}}
						addonBefore={listType}
						placeholder="Jot down your note here"
					/>
				</Form.Item>
				<Form.Item>
					<Button type="primary" htmlType="submit">
						Add to list
					</Button>
				</Form.Item>
			</Form>
		</Fragment>
	);
};

export default CreateTask;
