import React, { Component } from "react";
import { Link } from "react-router-dom";

class Day extends Component {
    state = {
        selected: false,
    };
    // getClass(selected) {
    //     return selected ? "day selected" : "day";
    // }

    render() {
        return (
            <Link
                to={"/page/2020-10-" + this.props.day}
                className="day"
                onClick={() => this.handleClick()}
            >
                {this.props.day}
            </Link>
        );
    }

    handleClick = () => {
        this.setState({ selected: true });
        // console.log(this.state);
    };
}

export default Day;
