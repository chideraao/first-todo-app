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
		search: "",
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
	//handle search change
	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
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
	// search logic
	searchText = (search) => {
		return this.state.todos.filter(
			(todo) =>
				todo.title.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
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
									<input
										type="text"
										name="search"
										placeholder="Search todos..."
										style={{
											display: "inline-block",
											width: "50vw",
											padding: "5px",
										}}
										value={this.state.search}
										onChange={this.handleChange}
									/>
									<Todos
										todos={this.searchText()}
										markComplete={this.markComplete}
										handleDelete={this.handleDelete}
									/>
									<AddTodo addTodo={this.addTodo} />
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
