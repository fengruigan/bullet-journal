import React, { Fragment, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Input, Popover, Card, Tooltip, Form, Button, Row, Col } from "antd";
import Emoji from "../emoji";
import CategoryModal from "./categoryModal";
import "../../css/journal/inputField.css";

const InputField = ({ onSubmit }) => {
	// Sets the state for the input, I might need a reducer
	let [categoryIndex, setCategoryIndex] = useState(0);
	// let [addDate, setAddDate] = useState(false);
	let [modalVisible, setModalVisible] = useState(false);

	// This is the list of LIST categories users can create. Later on this will be fetched from user data
	let [categories, setCategories] = useState([
		{ category: "Todo", emoji: "✅" },
		{ category: "Thought", emoji: "🤓" },
		{ category: "Note", emoji: "✏️" },
		{
			category: "Miscellaneous",
			emoji: "🧸",
		},
		{ category: "Misc.", emoji: "📌" },
	]);
	const [form] = Form.useForm();

	const onReset = () => {
		form.resetFields();
	};

	// content to go into the popover
	const popContent = (
		<Card id="popover">
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
			{/* The list of LIST categories */}
			{categories.map((item, index) => {
				return (
					<Card.Grid
						className="category-grid"
						key={index}
						onClick={() => {
							setCategoryIndex(index);
						}}
					>
						<Tooltip
							title={item.category}
							placement="top"
							arrowPointAtCenter={true}
						>
							<div style={{ fontSize: "1.3em", marginBottom: 0 }}>
								<span style={{ padding: "0" }}>
									<Emoji symbol={item.emoji} />
								</span>
							</div>
						</Tooltip>
						<p className="category-description">{item.category}</p>
					</Card.Grid>
				);
			})}
		</Card>
	);

	const listCategory = (
		<Popover content={popContent} trigger={"click"} placement={"bottom"}>
			<span style={{ padding: "0", fontSize: "1.5em" }}>
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
					let json = { ...values };
					json.category = categories[categoryIndex].emoji;
					onSubmit(json);
					onReset();
				}}
			>
				<Input.Group>
					<Row>
						<Col>
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
				</Input.Group>
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
