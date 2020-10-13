import React, { Component } from "react";
import Day from "./day";
import "../../css/calendar/calendar.css";

class Calendar extends Component {
	state = {
		day: [],
		weekday: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
	};
	componentDidMount() {
		console.log(this.props);
		this.generateCalendar();
	}
	handleClick(id) {
		// let days = document.querySelectorAll(".day");
		// days.forEach((day) => {
		//     console.log(day);
		// day.classList.remove("selected");
		// });
		// console.log(day);
		console.log(this);
	}
	render() {
		return (
			<React.Fragment>
				<h1 style={{ textAlign: "center" }}>
					This will be the month/year
				</h1>
				<div id="calendar-header">
					{this.state.weekday.map((weekday) => (
						<div className="header" key={weekday}>
							{weekday}
						</div>
					))}
				</div>
				<div id="calendar-main">
					{this.state.day.map((day) => (
						<Day
							key={day.id}
							day={day.id}
							// handleClick={() => {
							//     this.handleClick(day.id);
							// }}
						/>
					))}
				</div>
			</React.Fragment>
		);
	}

	generateCalendar() {
		let days = [];
		for (let i = 1; i < 32; i++) {
			days.push({ id: i });
		}
		this.setState({ day: days });
	}
}

export default Calendar;
