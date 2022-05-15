// gather all module to be exported
const express = require('express');
const {
    createActivity,
    getActivityByid,
    updateActivity,
    deleteActivityById,
    getActivity,
} = require('../controller/activity');
const { createTodo, updateTodo, deleteTodoById, getTodo, getTodoById } = require('../controller/todo');
const routes = express.Router();

// routes for Activity
routes.post('/activity-groups', createActivity);
routes.get('/activity-groups', getActivity);
routes.get('/activity-groups/:id', getActivityByid);
routes.patch('/activity-groups/:id', updateActivity);
routes.delete('/activity-groups/:id', deleteActivityById);
// routes for Todo
routes.post('/todo-items', createTodo);
routes.get('/todo-items', getTodo);
routes.patch('/todo-items/:id', updateTodo);
routes.get('/todo-items/:id', getTodoById);
routes.delete('/todo-items/:id', deleteTodoById);

module.exports = routes;
