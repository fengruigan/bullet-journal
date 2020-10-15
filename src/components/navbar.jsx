import React, { Component } from "react";
import { Layout, Menu, Dropdown } from "antd";
import {
	UserOutlined,
	UserAddOutlined,
	UnorderedListOutlined,
	InfoCircleOutlined,
} from "@ant-design/icons";
import Icon from "@ant-design/icons";
import { ReactComponent as Logo } from "../custom/icons/logo.svg";
import { Link } from "react-router-dom";

const { Header } = Layout;

class Navbar extends Component {
	state = {};

	renderMenu() {
		return (
			<Menu
				mode="horizontal"
				theme="light"
				style={{
					display: "inline",
					float: "right",
				}}
			>
				<Menu.Item
					key="about"
					icon={<InfoCircleOutlined style={{ fontsize: "1.2em" }} />}
				>
					About
				</Menu.Item>
				<Menu.Item
					key="sign-in"
					icon={<UserOutlined style={{ fontsize: "1.2em" }} />}
				>
					Sign-In
				</Menu.Item>
				<Menu.Item
					key="sign-up"
					icon={<UserAddOutlined style={{ fontsize: "1.2em" }} />}
				>
					Sign-Up
				</Menu.Item>
			</Menu>
		);
	}

	renderDropdown() {
		let menuItem = (
			<Menu
				mode="horizontal"
				theme="light"
				style={{
					display: "inline",
					float: "right",
				}}
			>
				<Menu.Item
					key="about"
					icon={<InfoCircleOutlined style={{ fontsize: "1.2em" }} />}
				>
					About
				</Menu.Item>
				<Menu.Divider />
				<Menu.Item
					key="sign-in"
					icon={<UserOutlined style={{ fontsize: "1.2em" }} />}
				>
					Sign-In
				</Menu.Item>
				<Menu.Item
					key="sign-up"
					icon={<UserAddOutlined style={{ fontsize: "1.2em" }} />}
				>
					Sign-Up
				</Menu.Item>
			</Menu>
		);
		let menu = (
			<Dropdown overlay={menuItem}>
				<a
					href={"/#"}
					className="ant-dropdown-link"
					onClick={(e) => e.preventDefault()}
					style={{ float: "right", marginRight: "1rem" }}
				>
					<UnorderedListOutlined style={{ fontsize: "1.2em" }} /> Menu
				</a>
			</Dropdown>
		);
		return menu;
	}

	getClass() {
		// console.log(this.props.collapsed);
		let col = this.props.collapsed ? "collapse" : "norm";
		return "nav nav-" + col;
	}

	render() {
		return (
			<Header className={this.getClass()}>
				<div id="brand-logo" style={{ display: "inline" }}>
					<Link to="/">
						<Icon component={Logo} /> Bullet Journal
					</Link>
				</div>
				{this.props.collapsed
					? this.renderDropdown()
					: this.renderMenu()}
			</Header>
		);
	}
}

export default Navbar;
