import React, { useEffect, useState } from "react";
import { Layout, Menu, Dropdown } from "antd";
import Icon, {
	UserOutlined,
	UserAddOutlined,
	UnorderedListOutlined,
	InfoCircleOutlined,
	BookOutlined,
	CalendarOutlined,
} from "@ant-design/icons";
import { ReactComponent as Logo } from "../custom/icons/logo.svg";
import { Link } from "react-router-dom";

const { Header } = Layout;

// class Navbar extends Component {
const Navbar = ({ currentDate, resetDate, collapsed }) => {
	// dateLink is the redirect link which redirects to the correct journal page
	let [dateLink, setDateLink] = useState("");

	// useEffect sets the dateLink whenever currentDate is changed
	useEffect(() => {
		setDateLink(currentDate.format("yyyy-MM-DD"));
	}, [currentDate]);

	// Because ant design does not accomodate resizing very well, they do not have automatic collapse of Navbars,
	// so we have to write our own and use media queries to conditonal render

	// This renders the fullsize menu
	const renderMenu = () => {
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
	};

	// This renders the collapsed menu
	const renderDropdown = () => {
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
				<Menu.Divider />
				<Menu.Item
					key="journal"
					icon={<BookOutlined style={{ fontsize: "1.2em" }} />}
				>
					<Link to={"/" + dateLink}>Journal</Link>
				</Menu.Item>
				<Menu.Item
					key="calendar"
					icon={<CalendarOutlined style={{ fontsize: "1.2em" }} />}
				>
					<Link to="/calendar">Calendar</Link>
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
	};

	// This generates the class strings for
	const getClass = () => {
		let col = collapsed ? "collapse" : "full";
		return "nav nav-" + col;
	};

	// This calls the resetDate funciton defined in App.js
	const handleClick = () => {
		resetDate();
	};

	return (
		<Header className={getClass()}>
			<div id="brand-logo" style={{ display: "inline" }}>
				<Link to="/" onClick={handleClick}>
					<Icon component={Logo} /> Bullet Journal
				</Link>
			</div>
			{collapsed ? renderDropdown() : renderMenu()}
		</Header>
	);
};

export default Navbar;
