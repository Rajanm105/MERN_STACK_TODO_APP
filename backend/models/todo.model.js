const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    title: {type: String},
    description: {type: String},
    completed: {type: Boolean, default: false}
})

module.exports = mongoose.model('Todo', TodoSchema);