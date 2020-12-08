import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import { Button, message, Form, Input } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { login } from "../util/userLogin";
import { UserContext } from "../contexts/UserContext";
import moment from "moment";

const layout = {
	labelCol: { span: 8 },
	wrapperCol: { span: 12 },
};
const tailLayout = {
	wrapperCol: { offset: 8, span: 16 },
};

const SignInPage = ({ apiUrl }) => {
	let { user, setUser } = useContext(UserContext);
	let [signedIn, setSignedIn] = useState(false);
	let [signIn, setSignIn] = useState(false);
	let [loading, setLoading] = useState(false);

	const messageKey = "userAuth";

	const [form] = Form.useForm();

	// const onReset = () => {
	// 	form.resetFields();
	// };

	const validateUsername = async (username) => {
		try {
			let json = JSON.stringify({ username });
			const response = await fetch(`${apiUrl}validate-username`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: json,
			});
			if (response && response.ok) {
				return true;
			} else {
				return false;
			}
		} catch (err) {
			console.log(err);
			return false;
		}
	};

	const confirmValidator = () => ({
		validator(rule, value) {
			if (!value || form.getFieldValue("password") === value) {
				return Promise.resolve();
			}
			return Promise.reject("Two passwords do not match");
		},
	});

	const usernameValidator = () => ({
		async validator(rule, value) {
			let forbidden = ",<.>/*?;:'\"[{]} `~+=_!@#$%^&()";
			if (value) {
				for (let i = 0; i < forbidden.length; i++) {
					if (value.indexOf(forbidden[i]) !== -1) {
						return Promise.reject(
							"Username cannot contain space or special characters"
						);
					}
				}
			}
			if (!value || (await validateUsername(value))) {
				return Promise.resolve();
			}
			return Promise.reject("Username unavailable");
		},
	});

	const setUserPassword = async (username, password) => {
		try {
			let auth = JSON.stringify({ username, password });
			const response = await fetch(`${apiUrl}${username}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: auth,
			});

			// sign-up success
			if (response && response.ok) {
				setLoading(false);
				await userLogin(username);
			} else {
				setLoading(false);
				message.error({
					content: "Error during sign up. Please try again",
					duration: 10,
					key: messageKey,
				});
			}
		} catch (err) {
			console.log(err);
		}
	};

	const userLogin = async (username) => {
		let loggedIn = await login(apiUrl, username);
		setUser(loggedIn);
		if (loggedIn) {
			// set most recent activity

			// redirect
			setSignedIn(true);
		}
	};

	// =====================================================================
	//                          SIGN UP FORM
	// =====================================================================

	const signUpForm = (
		<React.Fragment>
			<h1>Placeholder Sign-Up Page</h1>
			<div>
				Usernames cannot contain {",<.>/*?;:'\"[{]} `~+=_!@#$%^&()"}
			</div>
			<div style={{ marginBottom: "2em" }}>
				Passwords should be 8 - 20 characters long
			</div>

			<Form
				form={form}
				{...layout}
				style={{ textAlign: "left" }}
				onFinish={() => {
					setLoading(true);
					setUserPassword(
						form.getFieldValue("username"),
						form.getFieldValue("password")
					);
				}}
			>
				<Form.Item
					label="Username"
					name="username"
					hasFeedback
					rules={[
						{
							required: true,
							message: "Please input your username",
						},
						usernameValidator(),
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					label="Password"
					name="password"
					rules={[
						{
							required: true,
							message: "Please input your password",
						},
						{
							min: 8,
							max: 20,
							message:
								"Passwords should be between 8-20 characters long",
						},
					]}
				>
					{/* Potentially allow for autoComplete by adding property autoComplete="current-password"*/}
					{/* Use autoComplete="new-password" for sign up */}
					<Input.Password />
				</Form.Item>

				<Form.Item
					label="Confirm password"
					name="confirm"
					dependencies={["password"]}
					rules={[
						{
							required: true,
							message: "Please confirm your password",
						},
						confirmValidator(),
					]}
				>
					{/* Potentially allow for autoComplete by adding property autoComplete="current-password"*/}
					{/* Use autoComplete="new-password" for sign up */}
					<Input.Password />
				</Form.Item>
				<Form.Item {...tailLayout}>
					<Button disabled={loading} type="primary" htmlType="submit">
						{loading ? <LoadingOutlined /> : null} Sign up
					</Button>
					<div style={{ display: "inline", marginLeft: "1em" }}>
						Already have an account?{" "}
						<span
							style={{ color: "blue" }}
							onClick={() => {
								setSignIn(true);
							}}
						>
							Sign in here
						</span>
					</div>
				</Form.Item>
			</Form>

			{signIn ? <Redirect to={"/sign-in"} /> : null}
			{signedIn ? (
				<Redirect
					to={`/${user.username}/${moment().format("yyyy-MM-DD")}`}
				/>
			) : null}
		</React.Fragment>
	);

	return (
		<div
			style={{
				width: "70%",
				margin: "0 auto",
				textAlign: "center",
				paddingTop: "4rem",
			}}
		>
			{signUpForm}
		</div>
	);
};

export default SignInPage;
