import React, { useState, useEffect } from "react";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";

const { Sider } = Layout;

const Sidebar = ({ currentDate }) => {
	// dateLink is the redirect link which redirects to the correct journal page
	let [dateLink, setDateLink] = useState("");

	// useEffect sets the dateLink whenever currentDate is changed
	useEffect(() => {
		setDateLink(currentDate.format("yyyy-MM-DD"));
	}, [currentDate]);

	return (
		<Sider className="sidebar">
			<Menu mode="inline" theme="dark" selectedKeys={[]}>
				<Menu.Item key="journal">
					<Link to={"/" + dateLink}>Journal</Link>
				</Menu.Item>
				<Menu.Item key="calendar">
					<Link to="/calendar">Calendar</Link>
				</Menu.Item>
			</Menu>
		</Sider>
	);
};

export default Sidebar;
