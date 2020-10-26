import React, { Fragment } from "react";
import { SettingOutlined, SmileFilled } from "@ant-design/icons";
import { Input, Popover, Card, Tooltip } from "antd";

const types = [
	{ content: "Todo", icon: <SmileFilled /> },
	{ content: "Thought", icon: <SettingOutlined /> },
	{ content: "Note", icon: <SmileFilled /> },
	{ content: "Miscellaneous", icon: <SettingOutlined /> },
	{ content: "Misc.", icon: <SettingOutlined /> },
];

const gridStyle = {
	width: "25%",
	textAlign: "center",
	padding: "6px",
};

const popContent = (
	<Card>
		{types.map((item) => {
			return (
				<Card.Grid style={gridStyle}>
					<Tooltip
						title={item.content}
						placement={"top"}
						arrowPointAtCenter={false}
					>
						<p style={{ fontSize: "1.3em", marginBottom: 0 }}>
							{item.icon}
						</p>
					</Tooltip>
					<p
						style={{
							color: "gray",
							marginBottom: 0,
							maxWidth: "4em",
							overflow: "hidden",
							textOverflow: "ellipsis",
						}}
					>
						{item.content}
					</p>
				</Card.Grid>
			);
		})}
	</Card>
);

const listType = (
	<Popover content={popContent} trigger={"click"} placement={"bottom"}>
		<SettingOutlined />
	</Popover>
);

const CreateTask = () => {
	return (
		<Fragment>
			{" "}
			<Input
				addonBefore={listType}
				bordered={true}
				placeholder="Todo content"
			/>
		</Fragment>
	);
};

export default CreateTask;
