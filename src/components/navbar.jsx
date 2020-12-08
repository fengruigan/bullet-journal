import React, { useEffect, useState, useContext } from "react";
import { Layout, Menu, Dropdown, message } from "antd";
import Icon, {
	UserOutlined,
	UserAddOutlined,
	UnorderedListOutlined,
	InfoCircleOutlined,
	BookOutlined,
	CalendarOutlined,
	SmileTwoTone,
} from "@ant-design/icons";
import { ReactComponent as Logo } from "../custom/icons/logo.svg";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

const { Header } = Layout;

// class Navbar extends Component {
const Navbar = ({ currentDate, resetDate, collapsed }) => {
	// dateLink is the redirect link which redirects to the correct journal page
	let [dateLink, setDateLink] = useState("");

	let { user, setUser } = useContext(UserContext);
	let greeting = user
		? `Hello, ${user.nickname}!`
		: // : "Hi! Wait, you should sign in first you know.";
		  "Hey there!";
	let farewell = user
		? `Goodbye, ${user.nickname}! Hope to see you again soon!`
		: "Bye, Whoever you are!";

	const messageKey = "userAuth";

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
				selectedKeys={[]}
			>
				<Menu.Item
					key="about"
					icon={<InfoCircleOutlined className="navbar-icons" />}
				>
					About
				</Menu.Item>

				{user ? (
					<Menu.Item
						key="sign-out"
						icon={<UserOutlined className="navbar-icons" />}
						onClick={() => {
							try {
								setUser(null);
								message.success({
									content: farewell,
									duration: 3,
									key: messageKey,
									icon: <SmileTwoTone />,
								});
							} catch {
								message.info({
									content: "Something went wrong",
									duration: 2,
									key: messageKey,
									icon: <SmileTwoTone />,
								});
							}
						}}
					>
						Sign-out
					</Menu.Item>
				) : (
					<React.Fragment>
						<Menu.Item
							key="sign-in"
							icon={<UserOutlined className="navbar-icons" />}
						>
							<Link to="/sign-in">Sign-In</Link>
						</Menu.Item>

						<Menu.Item
							key="sign-up"
							icon={<UserAddOutlined className="navbar-icons" />}
						>
							<Link to="/sign-up">Sign-Up</Link>
						</Menu.Item>
					</React.Fragment>
				)}
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
					icon={<InfoCircleOutlined className="navbar-icons" />}
				>
					About
				</Menu.Item>
				<Menu.Divider />
				<Menu.Item
					key="sign-in"
					icon={<UserOutlined className="navbar-icons" />}
				>
					Sign-In
				</Menu.Item>
				<Menu.Item
					key="sign-up"
					icon={<UserAddOutlined className="navbar-icons" />}
				>
					Sign-Up
				</Menu.Item>
				<Menu.Divider />
				<Menu.Item
					key="journal"
					icon={<BookOutlined className="navbar-icons" />}
				>
					<Link to={"/" + dateLink}>Journal</Link>
				</Menu.Item>
				<Menu.Item
					key="calendar"
					icon={<CalendarOutlined className="navbar-icons" />}
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
					<UnorderedListOutlined className="navbar-icons" /> Menu
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
			<div
				style={{
					display: "inline",
					float: "right",
					marginRight: "1em",
				}}
			>
				<SmileTwoTone className="navbar-icons" /> {" " + greeting}
			</div>
		</Header>
	);
};

export default Navbar;
