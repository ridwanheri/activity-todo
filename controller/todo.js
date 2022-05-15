const db = require('../models');

const Todo = db.todo;

const createTodo = async (req, res) => {
    try {
        if (req.body.title === undefined || req.body.title === '') {
            res.status(400).json({
                success: 'Failed',
                status: 'Bad Request',
                message: 'title cannot be null',
            });
            return;
        }
        if (req.body.activity_group_id === undefined) {
            res.status(400).json({
                success: 'Failed',
                status: 'Bad Request',
                message: 'activity_group_id cannot be null',
            });
            return;
        }
        const result = await Todo.create({
            activity_group_id: req.body.activity_group_id,
            priority: req.body.priority,
            title: req.body.title,
            is_active: req.body.is_active,
        });
        res.status(201).json({
            success: 'Success',
            status: 'Success',
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

const getTodo = async (req, res) => {
    try {
        const result = await Todo.findAll({
            where: { activity_group_id: req.query.activity_group_id },
        });
        if (result === null) {
            res.status(404).json({
                success: 'Failed',
                status: 'Not Found',
                message: `Todo with ActivityID ${req.query.activity_group_id} Not Found`,
            });
            return;
        }
        res.status(200).json({
            success: 'Success',
            status: 'Success',
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

const getTodoById = async (req, res) => {
    try {
        const result = await Todo.findByPk(req.params.id);
        if (result === null) {
            res.status(404).json({
                success: 'Failed',
                status: 'Not Found',
                message: `Todo with ID ${req.params.id} Not Found`,
            });
            return;
        }
        res.status(200).json({
            success: 'Success',
            status: 'Success',
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
        console.log('result todo update ', result);
        if (result[0] !== 1) {
            res.status(404).json({
                success: 'Failed',
                status: 'Not Found',
                message: `Todo with ID ${req.params.id} Not Found`,
            });
            return;
        }
        const updated = await Todo.findByPk(req.params.id);
        res.status(200).json({
            success: 'Success',
            status: 'Success',
            data: updated,
        });
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
                status: 'Not Found',
                message: `Todo with ID ${req.params.id} Not Found`,
            });
        } else {
            res.status(200).json({
                success: 'Success',
                status: 'Success',
                data: {},
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

module.exports = { createTodo, getTodoById, updateTodo, deleteTodoById, getTodo };
