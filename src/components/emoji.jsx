import React from "react";

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
