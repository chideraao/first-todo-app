import React, { Component } from "react";
import TodoItem from "./TodoItem";
import PropTypes from "prop-types";

class Todos extends Component {
	render() {
		return this.props.todos.map((todo) => (
			<TodoItem
				todo={todo}
				key={todo.id}
				markComplete={this.props.markComplete}
				handleDelete={this.props.handleDelete}
			/>
		));
	}
}

Todos.propTypes = {
	todos: PropTypes.array.isRequired,
	markComplete: PropTypes.func.isRequired,
	handleDelete: PropTypes.func.isRequired,
};
export default Todos;
