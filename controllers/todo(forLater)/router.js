const router = require('../todolist')
const deleteTodo = require('./delete-todo')

router.delete('/:todoId', deleteTodo.handleRequest(req, res).catch(err => {
    console.log('Some error occured while deleting todo', err);
}));

router.post('/', addTodo.handleRequest(req, res).catch(err => {
    
}))