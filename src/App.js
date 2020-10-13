import React from "react";
import Navbar from "./components/navbar";
import { Layout } from "antd";
import { BrowserRouter as Router } from "react-router-dom";
import "./css/App.css";

const { Content, Sider } = Layout;

function App() {
	return (
		<Router>
			<Layout>
				<Navbar collapsed={false} />
				<Navbar collapsed={true} />
				<Layout>
					<Sider>Sider</Sider>
					<Content>Content</Content>
				</Layout>
			</Layout>
		</Router>
	);
}

export default App;
