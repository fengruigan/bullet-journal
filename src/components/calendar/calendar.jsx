import React, { Component, Fragment } from "react";
import { Calendar, Select, Col, Row, Radio, Button } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import { Redirect } from "react-router-dom";
import moment from "moment";

class MyCalendar extends Component {
	state = {
		selected: moment(),
		redirect: false,
		redirectTarget: "calendar",
	};
	componentDidMount() {
		this.setState({ selected: this.props.currentDate });
	}
	// resetDate = () => {
	// 	this.setState({ selected: moment() });
	// };
	headerRender = ({ value, type, onChange, onTypeChange }) => {
		const start = 0;
		const end = 12;
		const monthOptions = [];

		const current = value.clone();
		const localeData = value.localeData();
		const months = [];
		for (let i = 0; i < 12; i++) {
			current.month(i);
			months.push(localeData.monthsShort(current));
		}

		for (let index = start; index < end; index++) {
			monthOptions.push(
				<Select.Option className="month-item" key={`${index}`}>
					{months[index]}
				</Select.Option>
			);
		}
		const month = value.month();

		const year = value.year();
		const options = [];
		for (let i = year - 10; i < year + 10; i += 1) {
			options.push(
				<Select.Option key={i} value={i} className="year-item">
					{i}
				</Select.Option>
			);
		}
		return (
			<div style={{ padding: "12px" }}>
				{/* <div className="ant-picker-calendar-header"> */}
				{/* <Typography.Title level={4}>Custom header</Typography.Title> */}
				<Row gutter={8}>
					<Col>
						<Radio.Group
							onChange={(e) => onTypeChange(e.target.value)}
							value={type}
						>
							<Radio.Button value="month">Month</Radio.Button>
							<Radio.Button value="year">Year</Radio.Button>
						</Radio.Group>
					</Col>
					<Col>
						<Select
							dropdownMatchSelectWidth={false}
							onChange={(newYear) => {
								const now = value.clone().year(newYear);
								onChange(now);
							}}
							value={String(year)}
						>
							{options}
						</Select>
					</Col>
					<Col>
						<Select
							dropdownMatchSelectWidth={false}
							value={String(month)}
							onChange={(selectedMonth) => {
								const newValue = value.clone();
								newValue.month(parseInt(selectedMonth, 10));
								onChange(newValue);
							}}
						>
							{monthOptions}
						</Select>
					</Col>
					<Col>
						<Button onClick={this.props.resetDate}>
							<ReloadOutlined />
							Back to Today
						</Button>
					</Col>
				</Row>
			</div>
		);
	};
	setRedirect(value) {
		let target = value.format("yyyy-MM-DD");
		let redirect = false;
		if (value.isSame(this.state.selected, "month")) {
			redirect = true;
			this.props.onRedirect(value);
		}
		this.setState({
			redirect,
			selected: value,
			redirectTarget: target,
		});
	}
	renderRedirect() {
		if (this.state.redirect) {
			return <Redirect to={"/" + this.state.redirectTarget} />;
		}
	}
	render() {
		return (
			<Fragment>
				{this.renderRedirect()}
				<Calendar
					fullscreen={true}
					headerRender={this.headerRender}
					defaultValue={this.props.currentDate}
					onSelect={(value) => {
						this.setRedirect(value);
					}}
				/>
			</Fragment>
		);
	}
}

export default MyCalendar;
