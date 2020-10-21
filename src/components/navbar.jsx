import React, { Component } from "react";
import { Layout, Menu, Dropdown } from "antd";
import Icon, {
	UserOutlined,
	UserAddOutlined,
	UnorderedListOutlined,
	InfoCircleOutlined,
} from "@ant-design/icons";
import { ReactComponent as Logo } from "../custom/icons/logo.svg";
import { Link } from "react-router-dom";

const { Header } = Layout;

class Navbar extends Component {
	state = {};

	// Because ant design does not accomodate resizing very well, they do not have automatic collapse of Navbars,
	// so we have to write our own and use media queries to conditonal render

	// This renders the fullsize menu
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

	// This renders the collapsed menu
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

	// This generates the class strings for
	getClass() {
		let col = this.props.collapsed ? "collapse" : "full";
		return "nav nav-" + col;
	}

	// This calls the resetDate funciton defined in App.js
	handleClick = () => {
		this.props.resetDate();
	};

	render() {
		return (
			<Header className={this.getClass()}>
				<div id="brand-logo" style={{ display: "inline" }}>
					<Link to="/" onClick={this.handleClick}>
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
