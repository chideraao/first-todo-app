import React, { Component } from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import Todos from "./components/Todos";
import "./App.css";
import Header from "../src/components/layout/Header";
import AddTodo from "./components/AddTodo";
import About from "./components/Pages/About";
import Axios from "axios";
class App extends Component {
	state = {
		todos: [],
	};

	componentDidMount() {
		Axios.get(
			"https://jsonplaceholder.typicode.com/todos/?_limit=10"
		).then((res) => this.setState({ todos: res.data }));
	}

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
		Axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`).then(
			(res) =>
				this.setState({
					todos: [...this.state.todos.filter((todo) => todo.id !== id)],
				})
		);
	};

	//add new todo
	addTodo = (title) => {
		Axios.post("https://jsonplaceholder.typicode.com/todos", {
			title,
			completed: false,
			id: Math.random(),
		}).then((res) =>
			this.setState({
				todos: [...this.state.todos, res.data],
			})
		);
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
