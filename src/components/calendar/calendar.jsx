import React, { Fragment, useState, useEffect } from "react";
import { Calendar, Select, Col, Row, Radio, Button } from "antd";
import { Redirect } from "react-router-dom";
import { ReloadOutlined } from "@ant-design/icons";

const MyCalendar = (props) => {
	let [currentDate, setCurrentDate] = useState(props.currentDate);
	let [redirect, setRedirect] = useState(false);
	let [redirectTarget, setRedirectTarget] = useState("calendar");
	let dateFromProps = props.currentDate;

	useEffect(() => {
		setCurrentDate(dateFromProps);
	}, [dateFromProps]);

	let headerRender = ({ value, type, onChange, onTypeChange }) => {
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
						<Button onClick={props.resetDate}>
							<ReloadOutlined />
							Back to Today
						</Button>
					</Col>
				</Row>
			</div>
		);
	};

	let setupRedirect = (value) => {
		if (value.isSame(currentDate, "month")) {
			setRedirect(true);
			setRedirectTarget(value.format("yyyy-MM-DD"));
			props.onRedirect(value);
		}
		setCurrentDate(value);
	};
	let renderRedirect = () => {
		if (redirect) {
			return <Redirect to={"/" + redirectTarget} />;
		}
	};
	return (
		<Fragment>
			{renderRedirect()}
			<Calendar
				{...props}
				fullscreen={true}
				headerRender={headerRender}
				value={currentDate}
				onSelect={(value) => {
					setupRedirect(value);
				}}
			/>
		</Fragment>
	);
};

export default MyCalendar;
