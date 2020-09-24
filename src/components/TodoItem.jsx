import React, { Component } from "react";
import PropTypes from "prop-types";

export class TodoItem extends Component {
	getStyle = () => {
		return {
			textDecoration: this.props.todo.completed ? "line-through" : "none",
			background: "#f4f4f4",
			padding: "10px",
			borderBottom: "1px #ccc solid",
		};
	};
	render() {
		const { id, title } = this.props.todo;
		return (
			<div style={this.getStyle()}>
				<p>
					<input
						onChange={this.props.markComplete.bind(this, id)}
						type="checkbox"
					/>{" "}
					{"    "}
					{title}
					<button
						onClick={this.props.handleDelete.bind(this, id)}
						style={btnStyle}
					>
						{" "}
						X
					</button>
				</p>
			</div>
		);
	}
}
const btnStyle = {
	background: "#ff0000",
	float: "right",
	borderRadius: "50%",
	border: "none",
	padding: "5px 8px",
	cursor: "pointer",
};
TodoItem.propTypes = {
	todo: PropTypes.object.isRequired,
};
export default TodoItem;
