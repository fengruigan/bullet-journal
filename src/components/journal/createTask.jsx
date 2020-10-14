import React, { Component } from "react";
import "../../css/journal/createTask.css";

class CreateTask extends Component {
	state = {};
	render() {
		return (
			<div>
				<form>
					<div className="row">
						<button
							type="button"
							className="new-task btn-floating btn-small waves-effect waves-light blue"
						>
							<i className="material-icons">add</i>
						</button>
						{/* <span> </span>
                    <button
					type="button"
					className="new-task btn-floating btn-small waves-effect waves-light red"
                    >
					<i class="material-icons">clear</i>
				</button> */}
						<div className="input-field inline col s9">
							<input type="text" placeholder=" new task" />
						</div>
					</div>
				</form>
			</div>
		);
	}
}

export default CreateTask;
