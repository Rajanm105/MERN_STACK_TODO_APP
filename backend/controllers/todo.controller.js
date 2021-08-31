const Todo = require('../models/todo.model');

//Create and Save a new Todo
exports.create = (req, res) => {
    //Validate request
    if(!req.body.description){
        return res.status(400).send({
            message : "Todo description cannot be empty"
        });
    }

    //Create a Todo
    const todo = new Todo({
        title: req.body.title || "Untitled Todo",
        description: req.body.description,
        completed: req.body.completed
    });

    //Save Todo in the database
    todo.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Todo"
        });    
    });

};

//Retrieve and return all Todos from the database
    exports.findAll = (req, res) => {
        Todo.find()
        .then(todos => {
            res.send(todos);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Todos"
            });
        });
    };

//Find a single Todo with a TodoId
exports.findOne = (req, res) => {
        Todo.findById(req.params.todoId)
        .then(Todo => {
            if(!Todo){
                return res.status(404).send({
                    message: "Todo not found with id " + req.params.todoId
                });
            }
            res.send(Todo);
        }).catch(err => {
            if(err){
                return res.status(404).send({
                    message: "Todo not found with id " + req.params.todoId
                });
            }
            return res.status(500).send({
                message: "Error retrieving Todo with id " + req.params.todoId
            });
        });
    };

//Update a Todo identified by the TodoId in the request
exports.update = (req, res) => {
    //Validate request
    if(!req.body.description) {
        return res.status(400).send({
            message: "Todo description can not be empty"
        });
    }

    //Find Todo and update it with the request body
    Todo.findByIdAndUpdate(req.params.todoId, {
        title: req.body.title || "Untitled Todo",
        description: req.body.description,
        completed: req.body.completed
    }, {new: true})
    .then(todo => {
        if(!todo) {
            return res.status(404).send({
                message: "Todo not found with id" + req.params.todoId
            });
        }
        res.send(todo);
    }).catch(err => {
        if(err) {
            return res.status(404).send({
                message: "Todo not found with id " + req.params.todoId
            });
        }
        return res.status(500).send({
            message: "Error updating Todo with id" + req.params.todoId 
        });
    });
};

//Delete a Todo with the specified TodoId in the request
exports.delete = (req, res) => {
    Todo.findByIdAndRemove(req.params.todoId)
    .then(todo => {
        if(!todo) {
            return res.status(404).send({
                message: "Todo not found with id" + req.params.todoId
            });
        }
        res.send({message: "Todo deleted successfully!"});
    }).catch(err => {
        if(err) {
            return res.status(404).send({
                message: "Todo not found with id" + req.params.todoId
            });
        }
        return res.status(500).send({
            message: "Could not delete Todo with id" + req.params.todoId
        });
    });
};
