import React, { Component } from "react";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";

const { Sider } = Layout;

class Sidebar extends Component {
	state = {};

	render() {
		return (
			<Sider className="sidebar">
				<Menu mode="inline" theme="dark" selectedKeys={[]}>
					<Menu.Item key="journal">
						<Link to="/">Journal</Link>
					</Menu.Item>
					<Menu.Item key="calendar">
						<Link to="/calendar">Calendar</Link>
					</Menu.Item>
				</Menu>
			</Sider>
		);
	}
}

export default Sidebar;
