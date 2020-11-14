import React, { Fragment, useState } from "react";
import { SettingOutlined, SmileFilled, PlusOutlined } from "@ant-design/icons";
import { Input, Popover, Card, Tooltip, Form, Button, Modal } from "antd";
import Emoji from "../emoji";
import "../../css/journal/createTask.css";

// This is the list of LIST categories users can create. Later on this will be fetched from user data
const categories = [
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

const InputField = ({ onSubmit }) => {
	// Sets the state for the input, I might need a reducer
	let [category, setCategory] = useState("✅");
	let [modalVisible, setModalVisible] = useState(false);
	const [form] = Form.useForm();

	const onReset = () => {
		form.resetFields();
	};

	// content to go into the popover
	const popContent = (
		<Card>
			{/* The list of LIST categories */}
			{categories.map((item, index) => {
				return (
					<Card.Grid
						className="category-grid"
						key={index}
						onClick={() => {
							setCategory(item.emoji);
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
						<p className="category-description">{item.content}</p>
					</Card.Grid>
				);
			})}
			{/* This will be the new category button */}
			<Card.Grid
				className="category-grid"
				onClick={() => {
					setModalVisible(true);
				}}
			>
				<Tooltip title={"Add new tag"} placement={"top"}>
					<div className="category-new">
						<PlusOutlined />
					</div>
				</Tooltip>
			</Card.Grid>
		</Card>
	);

	const listCategory = (
		<Popover content={popContent} trigger={"click"} placement={"bottom"}>
			<span style={{ padding: "0", fontSize: "1.5em" }}>
				<Emoji symbol={category} />
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
					json.category = category;
					onSubmit(json);
					onReset();
				}}
			>
				<Form.Item
					name="content"
					rules={[
						{
							required: "true",
							message: "Please write down your notes here",
						},
					]}
				>
					<Input
						size="large"
						addonBefore={listCategory}
						placeholder="Jot down your note here"
					/>
				</Form.Item>
				<Form.Item>
					<Button type="primary" htmlType="submit">
						Add to list
					</Button>
				</Form.Item>
			</Form>
			<Modal
				visible={modalVisible}
				title={"Define your own note category"}
				centered={true}
				zIndex={9999}
				onOk={() => {
					setModalVisible(false);
					console.log("modal ok");
				}}
				onCancel={() => {
					setModalVisible(false);
					console.log("modal cancle");
				}}
			></Modal>
		</Fragment>
	);
};

export default InputField;
