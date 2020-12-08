import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import { Button } from "antd";
import { UserContext } from "../contexts/UserContext";

const LandingPage = () => {
	let { user } = useContext(UserContext);
	let [signIn, setSignIn] = useState(false);
	let [signUp, setSignUp] = useState(false);

	return (
		<div
			style={{
				height: "100%",
				width: "50%",
				margin: "0 auto",
				textAlign: "center",
				paddingTop: "5rem",
			}}
		>
			<h1>Placeholder Landing Page</h1>
			{user ? null : (
				<React.Fragment>
					<Button
						type="primary"
						onClick={() => {
							setSignIn(true);
						}}
					>
						Sign-In
					</Button>
					<Button
						type="primary"
						onClick={() => {
							setSignUp(true);
						}}
					>
						Sign-Up
					</Button>
				</React.Fragment>
			)}
			{signIn ? <Redirect to={"/sign-in"} /> : null}
			{signUp ? <Redirect to={"/sign-up"} /> : null}
		</div>
	);
};

export default LandingPage;
