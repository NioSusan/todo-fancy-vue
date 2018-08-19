const Todo = require("../models/todo");
const User = require("../models/user");

module.exports = {
	getTodos: (req, res) => {
		const { id } = req.user;
		User.findById(id)
			.populate("todos")
			.then(user => {
				let todos = user.todos;
				res.status(200).json(todos);
			})
			.catch(err => {
				res.status(500).json(err);
			});
	},

	newTodo: (req, res) => {
		const { id } = req.user;
		Todo.create({ name: req.body.name }).then(newTodo => {
			let todoId = newTodo._id;
			User.findOneAndUpdate({ _id: id }, { $push: { todos: todoId } })
				.then(success => {
					res.status(201).json({
						msg: "success",
						newTodo,
						success
					});
				})
				.catch(error => {
					res.status(500).json({
						msg: err.message
					});
				});
		});
	},

	getTodo: (req, res) => {
		Todo.findById(req.params.todoId)
			.then(todo => {
				res.status(200).json(todo);
			})
			.catch(err => {
				res.status(500).json(err);
			});
	},

	updateTodo: (req, res) => {
		Todo.findOneAndUpdate({ _id: req.params.todoId }, req.body, { new: true })
			.then(todo => {
				res.status(200).json(todo);
			})
			.catch(err => {
				res.status(500).json(err);
			});
	},

	deleteTodo: (req, res) => {
		const { id } = req.user;
		Todo.remove({ _id: req.params.todoId })
			.then(() => {
				User.findOneAndUpdate({ _id: id }, { $pull: { todos: req.params.todoId } })
					.then(success => {
						res.status(200).json({
							msg: "Successfully deleted!",
							success
						});
					})
					.catch(err => {
						res.status(500).json({
							msg: err.message
						});
					});
			})
			.catch(err => {
				res.status(500).json(err);
			});
	}
};
