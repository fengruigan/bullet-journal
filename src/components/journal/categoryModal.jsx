import React, { useRef, useState, useContext } from "react";
import { Modal, Col, Row, Form, Input, Tooltip, List, Button } from "antd";
import {
	QuestionCircleOutlined,
	EditOutlined,
	CloseOutlined,
	CheckOutlined,
	PlusOutlined,
	RollbackOutlined,
	InfoCircleOutlined,
} from "@ant-design/icons";
import emojiRegex from "emoji-regex/RGI_Emoji";
import Emoji from "../emoji";
import "../../css/journal/categoryModal.css";
import detectMobile from "../../util/detectMobile";
import { UserContext } from "../../contexts/UserContext";

// This is used to match emojis
const regex = emojiRegex();

const CategoryModal = ({ visible, setModalVisible, setSaving }) => {
	// This keeps track of where the form will be placed
	let [formIndex, setFormIndex] = useState(-1);
	// Determines wheter or not to show the form
	let [showForm, setShowForm] = useState(false);
	// Ant-Design syntax
	const [form] = Form.useForm();
	// Used in handleEmojiChange
	let emojiRef = useRef("");

	let { user, setUser } = useContext(UserContext);
	let categories = user ? user.settings.categories : [];

	// Resets form
	const onReset = () => {
		form.resetFields();
	};

	// This is used to make sure the emoji field only allows input of one emoji
	const handleEmojiChange = (e) => {
		const { value } = e.target;
		let match;
		let emojis = [];
		while ((match = regex.exec(value))) {
			emojis.push(match[0]);
		}
		if (emojis.length === 0) {
			emojiRef.current = "";
		} else if (emojiRef.current === "") {
			emojiRef.current = emojis[0];
		}
		form.setFields([{ name: "emoji", value: emojiRef.current }]);
	};

	// This is used to filter out emoji in category field
	const handleNameChange = (e) => {
		const { value } = e.target;
		let match;
		while ((match = regex.exec(value))) {
			form.setFields([
				{
					name: "category",
					value: value.replace(match[0], ""),
				},
			]);
		}
	};

	// Generates a tip for inputting emoji based on operating system
	const generateTip = () => {
		return navigator.appVersion.indexOf("Win") === -1
			? "^ + ⌘ + space"
			: "window key + period";
	};

	const setCategories = (categories) => {
		let currentUser = { ...user };
		currentUser.settings.categories = categories;
		setUser(currentUser);
	};

	const setLocalStorage = (postItem) => {
		let storage = localStorage.categoryTemp
			? JSON.parse(localStorage.categoryTemp)
			: [];
		let newCategoryTemp = [...storage, postItem];
		localStorage.setItem("categoryTemp", JSON.stringify(newCategoryTemp));
		setSaving(true);
		localStorage.setItem("saveTime", 5);
	};

	// Delete the category based on index
	const removeCategory = (index) => {
		// update setting
		let cat = [...categories].filter((el, idx) => {
			return idx === index ? null : el;
		});

		// update user setting
		setCategories(cat);

		// store to localStorage
		let postItem = {
			action: "DELETE",
			target: index,
			user: user.username,
			contentType: "category",
		};
		setLocalStorage(postItem);
	};

	// Modifies the categories list
	const onModify = (index, value) => {
		// update setting
		let cat = [...categories];
		value.isTodo = false;
		cat[index] = value;
		setFormIndex(-1);
		onReset();

		// update user setting
		setCategories(cat);

		// store to localStorage
		let postItem = {
			action: "PUT",
			target: index,
			user: user.username,
			contentType: "category",
			data: { ...value },
		};
		setLocalStorage(postItem);
	};

	// Create new category in categories list
	const onCreate = (value) => {
		// update setting
		let cat = [...categories];
		value.isTodo = false;
		cat.push(value);
		setFormIndex(-1);
		onReset();

		// update user setting
		setCategories(cat);

		// store to localStorage
		let postItem = {
			action: "POST",
			user: user.username,
			contentType: "category",
			data: { ...value },
		};
		setLocalStorage(postItem);
	};

	// Closes category modal
	const closeModal = () => {
		setFormIndex(-1);
		setShowForm(false);
		setModalVisible(false);
	};

	// Generates content to display in modal
	const generateContent = () => {
		return (
			<List
				dataSource={categories}
				renderItem={(item, index) =>
					// Renders form at formIndex
					index !== formIndex ? (
						<List.Item
							actions={
								// First index is reserved for todo-type category
								// Prevents users from deleting that category
								index !== 0
									? [
											// For modifying category
											<EditOutlined
												className="actions"
												style={{
													color: "orange",
												}}
												onClick={() => {
													setFormIndex(index);
													form.setFields([
														{
															name: "emoji",
															value: item.emoji,
														},
														{
															name: "category",
															value:
																item.category,
														},
													]);
													setShowForm(false);
												}}
											/>,
											// For deleting category
											<CloseOutlined
												className="actions"
												style={{ color: "red" }}
												onClick={() => {
													removeCategory(index);
												}}
											/>,
									  ]
									: [
											// For modifying category
											<EditOutlined
												className="actions"
												style={{
													color: "orange",
												}}
												onClick={() => {
													setFormIndex(index);
													form.setFields([
														{
															name: "emoji",
															value: item.emoji,
														},
														{
															name: "category",
															value:
																item.category,
														},
													]);
													setShowForm(false);
												}}
											/>,
											// Tell users about the function of todo-type category
											<Tooltip
												title="Items of this category will be auto generated
                                                 on the next journal page if not marked as complete"
												overlayStyle={{
													zIndex: 9999,
												}}
												placement="topRight"
												arrowPointAtCenter
											>
												<InfoCircleOutlined
													className="actions"
													style={{ color: "#40a9ff" }}
												/>
											</Tooltip>,
									  ]
							}
						>
							<List.Item.Meta
								avatar={
									<span style={{ fontSize: "1.3em" }}>
										<Emoji symbol={item.emoji} />
									</span>
								}
								title={item.category}
							/>
						</List.Item>
					) : (
						generateForm()
					)
				}
			/>
		);
	};

	// Generates the form
	const generateForm = () => {
		return (
			<Form form={form} id="form">
				<Input.Group>
					<Row gutter={7} id="first-row-inputs">
						<Col span={8}>
							<Form.Item
								name="emoji"
								rules={[
									{
										required: "true",
										message: "Emoji required",
									},
								]}
							>
								<Input
									placeholder="One emoji"
									onChange={handleEmojiChange}
									suffix={
										detectMobile() ? null : (
											<Tooltip
												overlayStyle={{
													zIndex: 9999,
												}}
												placement="topLeft"
												title={
													"To type emoji press " +
													generateTip()
												}
											>
												<QuestionCircleOutlined
													style={{
														fontSize: "1.15em",
														color:
															"rgba(0,0,0,0.5)",
													}}
												/>
											</Tooltip>
										)
									}
								/>
							</Form.Item>
						</Col>
						<Col span={9} xl={11}>
							<Form.Item
								name="category"
								rules={[
									{
										required: "true",
										message: "A name required",
									},
								]}
							>
								<Input
									onChange={handleNameChange}
									placeholder="Give a name"
								/>
							</Form.Item>
						</Col>
						{/* A confirm button for the form */}
						<Col>
							<Button
								id="form-confirm"
								shape="circle"
								onClick={() => {
									form.validateFields()
										.then((value) => {
											formIndex === -1
												? onCreate(value)
												: onModify(formIndex, value);
											setShowForm(false);
										})
										.catch((err) => {
											console.log(err);
										});
								}}
								icon={<CheckOutlined />}
							/>
						</Col>
						{/* A cancel button for the form */}
						<Col>
							<Button
								id="form-cancel"
								shape="circle"
								icon={<RollbackOutlined />}
								onClick={() => {
									setFormIndex(-1);
									setShowForm(false);
								}}
							/>
						</Col>
					</Row>
				</Input.Group>
			</Form>
		);
	};

	return (
		<React.Fragment>
			<Modal
				visible={visible}
				// visible={true}
				title={"Manage own note category here"}
				centered={true}
				zIndex={9999}
				onCancel={() => {
					closeModal();
				}}
				footer={
					<Button
						type="primary"
						onClick={() => {
							closeModal();
						}}
					>
						OK
					</Button>
				}
			>
				{generateContent()}
				{showForm ? (
					generateForm()
				) : (
					// A button to add new category
					<Button
						style={{ marginTop: "0.5em" }}
						shape="circle"
						icon={<PlusOutlined />}
						onClick={() => {
							setFormIndex(-1);
							onReset();
							setShowForm(true);
						}}
					/>
				)}
			</Modal>
		</React.Fragment>
	);
};

export default CategoryModal;
