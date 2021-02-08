import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import { Button, message, Form, Input } from "antd";
import Icon, { SmileTwoTone, LoadingOutlined } from "@ant-design/icons";
import { login } from "../util/userLogin";
import { UserContext } from "../contexts/UserContext";
import { ReactComponent as Welcome } from "../custom/icons/welcome.svg";
import { ReactComponent as PasswordFocus } from "../custom/icons/typing_password.svg";
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
	let [signUp, setSignUp] = useState(false);
	let [loading, setLoading] = useState(false);
	let [passwordFocus, setPasswordFocus] = useState(false);

	const messageKey = "userAuth";

	let farewell = user
		? `Goodbye, ${user.nickname}!`
		: "Bye, Whoever you are!";

	const [form] = Form.useForm();

	const checkUserPassword = async (username, password) => {
		try {
			let auth = JSON.stringify({ username, password });
			const response = await fetch(`${apiUrl}${username}/sign-in`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: auth,
			});

			// sign-in success
			if (response && response.ok) {
				setLoading(false);
				await userLogin(username);
			} else {
				setLoading(false);
				message.error({
					content: "Username or password incorrect. Please try again",
					duration: 10,
					key: messageKey,
				});
			}
		} catch (err) {
			setLoading(false);
			console.log(err.message);
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
	//                          SIGN IN FORM
	// =====================================================================

	const signInForm = (
		<React.Fragment>
			<h1>Placeholder Sign-In Page</h1>
			<Icon
				component={passwordFocus ? PasswordFocus : Welcome}
				style={{ fontSize: "8em", marginBottom: "0.25em" }}
			/>
			<Form
				form={form}
				{...layout}
				style={{ textAlign: "left" }}
				onFinish={() => {
					setLoading(true);
					checkUserPassword(
						form.getFieldValue("username"),
						form.getFieldValue("password")
					);
				}}
			>
				<Form.Item
					label="Username"
					name="username"
					rules={[
						{
							required: true,
							message: "Please input your username",
						},
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
					]}
				>
					{/* Potentially allow for autoComplete by adding property autoComplete="current-password"*/}
					{/* Use autoComplete="new-password" for sign up */}
					<Input.Password
						onFocus={() => {
							setPasswordFocus(true);
						}}
						onBlur={() => {
							setPasswordFocus(false);
						}}
					/>
				</Form.Item>
				<Form.Item {...tailLayout}>
					<Button
						disabled={loading}
						style={{ width: "7em" }}
						type="primary"
						htmlType="submit"
					>
						{loading ? <LoadingOutlined /> : null} Sign in
					</Button>
					<div style={{ display: "inline", marginLeft: "1em" }}>
						New user?{" "}
						<span
							style={{ color: "blue" }}
							onClick={() => {
								setSignUp(true);
							}}
						>
							Sign up here
						</span>
					</div>
				</Form.Item>
			</Form>

			<hr className="wide-divider" />
			<h1>Users for testing</h1>

			{user ? (
				<div>
					<Button
						type="primary"
						onClick={() => {
							try {
								setUser(null);
								message.success({
									content: farewell,
									duration: 3,
									key: messageKey,
									icon: <SmileTwoTone />,
								});
							} catch {
								message.info({
									content: "Something went wrong",
									duration: 2,
									key: messageKey,
									icon: <SmileTwoTone />,
								});
							}
						}}
					>
						Logout {user.nickname}
					</Button>
				</div>
			) : (
				<div>
					<div style={{ marginBottom: "1em" }}>
						<Button
							type="primary"
							onClick={async () => {
								await userLogin("user");
							}}
						>
							Login as user
						</Button>
					</div>
					<div>
						<Button
							type="primary"
							onClick={async () => {
								await userLogin("tester");
							}}
						>
							Login as tester
						</Button>
					</div>
				</div>
			)}
			{signUp ? <Redirect to={"/sign-up"} /> : null}
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
			{signInForm}
		</div>
	);
};

export default SignInPage;
