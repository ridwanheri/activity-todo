const db = require('../models');

const Todo = db.todo;

const createTodo = async (req, res) => {
    try {
        const result = await Todo.create({
            activity_group_id: req.body.activity_group_id,
            priority: req.body.priority,
            title: req.body.title,
        });
        res.status(201).json({
            success: 'Success',
            data: result,
        });
    } catch (error) {
        res.status(500).json({
            success: 'Failed',
            message: 'Failed to create todo',
        });
        console.log('>> Error while creating todo: ', error);
    }
};

const getTodoByActivityId = async (req, res) => {
    try {
        const result = await Todo.findAll({
            where: { activity_group_id: req.params.activity_group_id },
        });
        res.status(200).json({
            success: 'Success',
            data: result,
        });
    } catch (error) {
        res.status(500).json({
            success: 'Failed',
            message: 'Failed to get todo',
        });
        console.log('>> Error while get todo by activity id: ', error);
    }
};

const updateTodo = async (req, res) => {
    try {
        const result = await Todo.update(req.body, {
            where: { id: req.params.id },
        });
        if (result[0] !== 1) {
            res.status(404).json({
                success: 'Failed',
                message: 'Todo does not existed',
            });
        } else {
            res.status(200).json({
                success: 'Success',
                message: 'Success update todo',
            });
        }
    } catch (error) {
        res.status(500).json({
            success: 'Failed',
            message: 'Failed to update todo',
        });
        console.log('>> Error while update todo: ', error);
    }
};

const deleteTodoById = async (req, res) => {
    try {
        const result = await Todo.destroy({ where: { id: req.params.id } });
        if (result === 0) {
            res.status(404).json({
                success: 'Failed',
                message: 'Todo does not exist',
            });
        } else {
            res.status(200).json({
                success: 'Success',
            });
        }
    } catch (error) {
        res.status(500).json({
            success: 'Failed',
            message: 'Failed to delete todo',
        });
        console.log('>> Error while delete todo: ', error);
    }
};

module.exports = { createTodo, getTodoByActivityId, updateTodo, deleteTodoById };
