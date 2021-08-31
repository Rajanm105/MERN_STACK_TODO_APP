module.exports = (app) => {
    const todo = require('../controllers/todo.controller.js');

    //Create a new todo
    app.post('/todos', todo.create);

    //Retrieve all todo
    app.get('/todos', todo.findAll);

    //Retrieve a single todo with todoId
    app.get('/todos/:todoId', todo.findOne);

    //Update a todo with todoId
    app.put('/todos/:todoId', todo.update);

    //Delete a todo with todoId
    app.delete('/todos/:todoId', todo.delete);
}