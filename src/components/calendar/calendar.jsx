import React, { Component, Fragment } from "react";
import { Calendar } from "antd";
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
	setRedirect(value) {
		let target = value.toISOString().substring(0, 10);
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
