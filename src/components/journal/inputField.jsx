import React, { Fragment, useState } from "react";
import { SettingOutlined } from "@ant-design/icons";
import { Input, Popover, Card, Tooltip, Form, Row, Col, Button } from "antd";
import Emoji from "../emoji";
import CategoryModal from "./categoryModal";
import "../../css/journal/inputField.css";

const InputField = ({ onSubmit }) => {
	// Keeps track of the index of the currently selected category
	let [categoryIndex, setCategoryIndex] = useState(0);
	// Keeps track of whether the categoryModal should be visible
	let [modalVisible, setModalVisible] = useState(false);
	// This is the list of LIST categories users can create. Later on this will be fetched from user data
	// The isTodo property is used to determine if the category needs to be auto gened on next page
	let [categories, setCategories] = useState([
		{ category: "Todo", emoji: "✅", isTodo: true },
		{ category: "Thought", emoji: "🤓", isTodo: false },
		{ category: "Note", emoji: "✏️", isTodo: false },
		{
			category: "Miscellaneous",
			emoji: "🧸",
			isTodo: false,
		},
		{ category: "Misc.", emoji: "📌", isTodo: false },
	]);
	// Ant-Design Syntax
	const [form] = Form.useForm();

	// Resets form
	const onReset = () => {
		form.resetFields();
	};

	// content to go into the popover
	const popContent = (
		<Card id="popover">
			{/* This will be the manage category button */}
			<Card.Grid
				className="category-grid"
				onClick={() => {
					setModalVisible(true);
				}}
			>
				<Tooltip title={"Manage categories"} placement={"top"}>
					<div className="category-new">
						<SettingOutlined />
					</div>
				</Tooltip>
			</Card.Grid>
			{/* The list of LIST categories */}
			{categories.map((item, index) => {
				return (
					<Tooltip
						key={index}
						title={item.category}
						placement="top"
						arrowPointAtCenter
					>
						<Card.Grid
							className="category-grid"
							key={index}
							onClick={() => {
								setCategoryIndex(index);
							}}
						>
							<div style={{ fontSize: "1.3em", marginBottom: 0 }}>
								<span style={{ padding: "0" }}>
									<Emoji symbol={item.emoji} />
								</span>
							</div>
							<p className="category-description">
								{item.category}
							</p>
						</Card.Grid>
					</Tooltip>
				);
			})}
		</Card>
	);

	// This is the content of addonBefore of the input field
	const listCategory = (
		<Popover
			content={popContent}
			trigger={"click"}
			placement={"bottomLeft"}
			arrowPointAtCenter
		>
			<span style={{ fontSize: "1.5em" }}>
				<Emoji symbol={categories[categoryIndex].emoji} />
			</span>
		</Popover>
	);

	// The input field for creating new LIST
	return (
		<Fragment>
			<Form
				form={form}
				onFinish={(values) => {
					let listItem = { ...values };
					listItem.category = categories[categoryIndex].emoji;
					categories[categoryIndex].isTodo
						? (listItem.completed = false)
						: (listItem.crossed = false);
					onSubmit(listItem);
					onReset();
				}}
			>
				<Row>
					<Col xs={19} sm={21}>
						<Form.Item
							name="content"
							rules={[
								{
									required: "true",
									message:
										"Please write down your notes here",
								},
							]}
						>
							<Input
								style={{
									paddingLeft: "0.7em",
								}}
								size={"large"}
								allowClear={true}
								addonBefore={listCategory}
								placeholder="Jot down your note here"
							/>
						</Form.Item>
					</Col>
					<Col>
						<Form.Item>
							<Button
								type="primary"
								htmlType="submit"
								size="large"
							>
								Add
							</Button>
						</Form.Item>
					</Col>
				</Row>
			</Form>

			{/* Modal for customizing list category */}
			<CategoryModal
				visible={modalVisible}
				setModalVisible={setModalVisible}
				categories={categories}
				setCategories={setCategories}
			/>
		</Fragment>
	);
};

export default InputField;
