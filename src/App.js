import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Todos from "./components/Todos";
import "./App.css";
import Header from "../src/components/layout/Header";
import AddTodo from "./components/AddTodo";
import About from "./components/Pages/About";

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
	//handle delete
	handleDelete = (id) => {
		this.setState({
			todos: [...this.state.todos.filter((todo) => todo.id !== id)],
		});
	};

	//add new todo
	addTodo = (title) => {
		const newTodo = {
			id: Math.random(),
			title,
			completed: false,
		};
		this.setState({
			todos: [...this.state.todos, newTodo],
		});
	};
	render() {
		return (
			<Router>
				<div>
					<div className="container">
						<Header />
						<Route
							exact
							path="/"
							render={(props) => (
								<React.Fragment>
									<AddTodo addTodo={this.addTodo} />
									<Todos
										todos={this.state.todos}
										markComplete={this.markComplete}
										handleDelete={this.handleDelete}
									/>
								</React.Fragment>
							)}
						/>
						<Route path="/about" component={About} />
					</div>
				</div>
			</Router>
		);
	}
}

export default App;
