import React, { useContext, useState } from "react";
import { Button } from "antd";
import { login } from "../util/userLogin";
import { UserContext } from "../contexts/UserContext";
import { Redirect } from "react-router-dom";
import moment from "moment";

const LandingPage = ({ apiUrl }) => {
	let { user, setUser } = useContext(UserContext);
	let [redirecting, setRedirecting] = useState(false);

	const userLogin = async (username) => {
		let loggedIn = await login(apiUrl, username);
		setUser(loggedIn);
		setRedirecting(true);
	};

	return (
		<div
			style={{
				width: "50%",
				margin: "0 auto",
				textAlign: "center",
				paddingTop: "5rem",
			}}
		>
			<h1>Mock Landing Page</h1>
			{user ? (
				<div>
					<Button
						type="primary"
						onClick={() => {
							setUser(null);
						}}
					>
						Logout
					</Button>
				</div>
			) : (
				<div>
					<Button
						type="primary"
						onClick={async () => {
							await userLogin("user");
						}}
					>
						Login as user
					</Button>
					<Button
						type="primary"
						onClick={async () => {
							await userLogin("tester");
						}}
					>
						Login as tester
					</Button>{" "}
				</div>
			)}
			{redirecting ? (
				<Redirect
					to={`/${user.username}/${moment().format("yyyy-MM-DD")}`}
				/>
			) : null}
		</div>
	);
};

export default LandingPage;
