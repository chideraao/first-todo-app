import React, { Component } from "react";
import Todos from "./components/Todos";
import "./App.css";

class App extends Component {
	state = {
		todos: [
			{ id: 1, title: "take out the trash", completed: false },
			{ id: 2, title: "dinner with kachi", completed: true },
			{ id: 3, title: "meeting with boss", completed: false },
		],
	};

	//toggle complete
	markComplete = (id) => {
		this.setState({
			todos: this.state.todos.map((todo) => {
				if (todo.id === id) {
					todo.completed = !todo.completed;
				}
				return todo;
			}),
		});
	};
	render() {
		return (
			<div>
				<Todos todos={this.state.todos} markComplete={this.markComplete} />
			</div>
		);
	}
}

export default App;
