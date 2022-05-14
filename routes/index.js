// gather all module to be exported
const express = require('express');
const {
    createActivity,
    getActivityByid,
    updateActivity,
    deleteActivityById,
    getActivity,
} = require('../controller/activity');
const { createTodo, getTodoByActivityId, updateTodo, deleteTodoById } = require('../controller/todo');
const routes = express.Router();

// routes for Activity
routes.post('/activity-groups', createActivity);
routes.get('/activity-groups', getActivity);
routes.get('/activity-groups/:id', getActivityByid);
routes.put('/activity-groups/:id', updateActivity);
routes.delete('/activity-groups/:id', deleteActivityById);
// routes for Todo
routes.post('/todo-items', createTodo);
routes.get('/todo-items/:activity_group_id', getTodoByActivityId);
routes.put('/todo-items/:id', updateTodo);
routes.delete('/todo-items/:id', deleteTodoById);

module.exports = routes;
