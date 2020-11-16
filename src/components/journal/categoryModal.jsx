import React, { useRef } from "react";
import { Modal, Col, Row, Form, Input, Tooltip } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import emojiRegex from "emoji-regex/RGI_Emoji";

const regex = emojiRegex();

const CategoryModal = ({ modalVisible, setModalVisible }) => {
	// let [modalVisible, setModalVisible] = useState(false);
	const [form] = Form.useForm();
	let emojiRef = useRef("");

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

	const onCreate = (value) => {
		// post value to db
		console.log(value);
		setModalVisible(false);
	};

	return (
		<React.Fragment>
			<Modal
				visible={modalVisible}
				title={"Create your own note category here"}
				centered={true}
				zIndex={9999}
				onOk={() => {
					console.log("modal ok");
					form.validateFields()
						.then((value) => {
							onCreate(value);
						})
						.catch(() => {});
				}}
				onCancel={() => {
					setModalVisible(false);
					console.log("modal cancle");
				}}
				okText="Create"
				cancelText="Back"
			>
				<Form form={form}>
					<Input.Group size={"large"}>
						<Row gutter={8}>
							<Col span={9}>
								<Form.Item
									label="Icon"
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
														fontSize: "1.2em",
														color:
															"rgba(0,0,0,0.5)",
													}}
												/>
											</Tooltip>
										}
									/>
								</Form.Item>
							</Col>
							<Col span={13}>
								<Form.Item
									label="Category"
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
										placeholder="Give it a name"
									/>
								</Form.Item>
							</Col>
						</Row>
					</Input.Group>
				</Form>
			</Modal>
		</React.Fragment>
	);
};

export default CategoryModal;
