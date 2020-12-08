import React from "react";
import { message } from "antd";
import { SmileTwoTone } from "@ant-design/icons";

const messageKey = "userAuth";

export const login = async (apiUrl, username) => {
	// fetch from db
	let signedInUser;
	try {
		let response = await fetch(apiUrl + username);
		signedInUser = await response.json();
		if (response && response.ok) {
			let greeting = `Greetings, ${signedInUser.nickname}!`;

			message.success({
				content: greeting,
				duration: 2,
				key: messageKey,
				icon: <SmileTwoTone />,
			});
		} else {
			signedInUser = null;
			message.error({
				content: "Login failed. Please try again",
				duration: 2,
				key: messageKey,
			});
		}
	} catch {
		signedInUser = null;
		message.error({
			content: "Login failed. Please try again",
			duration: 2,
			key: messageKey,
		});
	}
	return signedInUser;
};
