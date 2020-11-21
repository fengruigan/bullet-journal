import React, { useRef, useState } from "react";
import { Modal, Col, Row, Form, Input, Tooltip, List, Button } from "antd";
import {
	QuestionCircleOutlined,
	EditOutlined,
	CloseOutlined,
	CheckOutlined,
	PlusOutlined,
	RollbackOutlined,
} from "@ant-design/icons";
import emojiRegex from "emoji-regex/RGI_Emoji";
import Emoji from "../emoji";
import "../../css/journal/categoryModal.css";
import detectMobile from "../../util/detectMobile";

const regex = emojiRegex();

const CategoryModal = ({
	visible,
	setModalVisible,
	categories,
	setCategories,
}) => {
	let [formIndex, setFormIndex] = useState(-1);
	let [showForm, setShowForm] = useState(false);
	const [form] = Form.useForm();
	let emojiRef = useRef("");

	const onReset = () => {
		form.resetFields();
	};

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

	const generateTip = () => {
		return navigator.appVersion.indexOf("Win") === -1
			? "^ + ⌘ + space"
			: "win key + period";
	};

	const removeCategory = (index) => {
		let cat = [...categories].filter((el, idx) => {
			return idx === index ? null : el;
		});
		setCategories(cat);
	};

	const onModify = (index, value) => {
		let cat = [...categories];
		value.default = false;
		cat[index] = value;
		// post value to db
		setCategories(cat);
		setFormIndex(-1);
		onReset();
	};

	const onCreate = (value) => {
		// post value to db
		let cat = [...categories];
		value.default = false;
		cat.push(value);
		setCategories(cat);
		onReset();
	};

	const closeModal = () => {
		onReset();
		setFormIndex(-1);
		setShowForm(false);
		setModalVisible(false);
	};

	const generateContent = () => {
		return (
			<List
				dataSource={categories}
				renderItem={(item, index) =>
					index !== formIndex ? (
						<List.Item
							actions={[
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
												value: item.category,
											},
										]);
										setShowForm(false);
									}}
								/>,
								<CloseOutlined
									className="actions"
									style={{ color: "red" }}
									onClick={() => {
										removeCategory(index);
									}}
								/>,
							]}
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
									bordered={false}
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
													"To type emojis press " +
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
									bordered={false}
									onChange={handleNameChange}
									placeholder="Give a name"
								/>
							</Form.Item>
						</Col>
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
