import React, { Fragment, useState, useEffect } from "react";
import { Calendar, Select, Col, Row, Radio, Button } from "antd";
import { Redirect } from "react-router-dom";
import { ReloadOutlined } from "@ant-design/icons";
import moment from "moment";

const MyCalendar = ({ currentDate, resetDate, onRedirect }) => {
	// This is a wrapper for ant design Calendar component.
	// I handle calendar redirect logics here to make the main App component code a bit cleaner.

	// date is the date which will be shown as selected on the calendar
	// The default value is the date state passed from App component.
	// Meaning the default selected date is the date state from App component
	let [date, setDate] = useState(currentDate);

	// redirect tracks the redirect status and determines whether to redirect or not.
	// Defaulting to be not redirecting.
	let [redirect, setRedirect] = useState(false);

	// redirectTarget tracks the redirect target date to use in url
	// Defaulting to redirect to "/calendar"
	let [redirectTarget, setRedirectTarget] = useState("calendar");

	// useEffect sets the date to be the date state passed from App component.
	// whenever dateFromProps is changed.
	useEffect(() => {
		setDate(currentDate.clone());
	}, [currentDate]);

	// This function is used to render a custom calendar header
	// I am using this only to add a "back to today" button
	// Most can be ignored unless details need to be changed
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

					{/* This is the button I added, all above are default buttons.
						Unfortunately I cannot seem to refactor this code into another file
						due to the need of resetDate from props, sucks */}
					<Col>
						<Button onClick={resetDate}>
							<ReloadOutlined />
							Back to Today
						</Button>
					</Col>
				</Row>
			</div>
		);
	};

	// This function is called whenever a date is selected on the calendar
	let setupRedirect = (value) => {
		// if the selected date is in the same month as date
		if (value.isSame(date, "month")) {
			setRedirect(true);
			setRedirectTarget(value.format("yyyy-MM-DD"));
			onRedirect(value.clone()); // Calling onDateChange in App component
		}
		// set date to be the selected date
		setDate(value.clone());
	};

	return (
		<Fragment>
			{/* Page will redirect if redirect is true */}
			{redirect && <Redirect to={"/user/" + redirectTarget} />}
			<Calendar
				disabledDate={(date) => {
					if (moment().isSameOrAfter(date, "day")) return false;
					else return true;
				}}
				fullscreen={true}
				headerRender={headerRender}
				value={date}
				onSelect={(value) => {
					setupRedirect(value);
				}}
			/>
		</Fragment>
	);
};

export default MyCalendar;
