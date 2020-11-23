import React from "react";

// This is a component to help include emojis into the page
const Emoji = (props) => {
	return (
		<span
			role="img"
			aria-label={props.lable ? props.lable : ""}
			aria-hidden={props.lable ? "false" : "true"}
		>
			{props.symbol}
		</span>
	);
};

export default Emoji;
