const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const toDoSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    category: String,
    description: {
        type: String,
        maxlength: 256,
    },
    status: {
        type: String,
        enum: ['To Do', 'Doing', 'Done'],
        required: true
    }
});

const ToDo = mongoose.model('ToDo', toDoSchema);

module.exports = ToDo;