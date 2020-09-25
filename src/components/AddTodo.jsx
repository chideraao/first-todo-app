import React, { Component } from "react";
import PropTypes from "prop-types";

export class AddTodo extends Component {
	constructor(props) {
		super(props);

		this.state = {
			title: "",
		};
	}
	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
		});
	};

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.addTodo(this.state.title);
		this.setState({
			title: "",
		});
	};
	render() {
		return (
			<form onSubmit={this.handleSubmit} style={{ display: "flex" }}>
				<input
					type="text"
					name="title"
					placeholder="Add todo..."
					style={{ flex: 10, padding: "5px" }}
					value={this.state.title}
					onChange={this.handleChange}
				/>{" "}
				<input
					type="submit"
					value="Submit"
					className="btn"
					style={{ flex: 1 }}
				/>
			</form>
		);
	}
}
AddTodo.propTypes = {
	addTodo: PropTypes.func.isRequired,
};

export default AddTodo;
