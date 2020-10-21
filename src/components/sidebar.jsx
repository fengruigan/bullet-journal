import React, { useState, useEffect } from "react";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";

const { Sider } = Layout;

const Sidebar = (props) => {
	// dateLink is the redirect link which redirects to the correct journal page
	let [dateLink, setDateLink] = useState("");

	// the date state is passed from App component down to here through props
	let dateFromProps = props.currentDate;

	// useEffect sets the dateLink whenever dateFromProps is changed
	useEffect(() => {
		setDateLink(dateFromProps.format("yyyy-MM-DD"));
	}, [dateFromProps]);

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
