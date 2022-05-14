const db = require('../models');

const Activity = db.activity;

const createActivity = async (req, res) => {
    try {
        const result = await Activity.create({
            title: req.body.title,
        });
        res.status(201).json({
            success: 'Success',
            data: result,
        });
    } catch (error) {
        res.status(500).json({
            success: 'Failed',
            message: 'Failed to create activity',
        });
        console.log('>> Error while creating activity: ', error);
    }
};

const updateActivity = async (req, res) => {
    try {
        const result = await Activity.update(req.body, {
            where: { id: req.params.id },
        });
        if (result[0] !== 1) {
            res.status(404).json({
                success: 'Failed',
                message: 'Activity does not existed',
            });
        } else {
            res.status(200).json({
                success: 'Success',
                message: 'Success update activity',
            });
        }
    } catch (error) {
        res.status(500).json({
            success: 'Failed',
            message: 'Failed to update activity',
        });
        console.log('>> Error while update activity: ', error);
    }
};

const deleteActivityById = async (req, res) => {
    try {
        const result = await Activity.destroy({ where: { id: req.params.id } });
        if (result === 0) {
            res.status(404).json({
                success: 'Failed',
                message: 'Activity does not exist',
            });
        } else {
            res.status(200).json({
                success: 'Success',
            });
        }
    } catch (error) {
        res.status(500).json({
            success: 'Failed',
            message: 'Failed to delete activity',
        });
        console.log('>> Error while delete activity: ', error);
    }
};

const getActivityByid = async (req, res) => {
    try {
        const result = await Activity.findByPk(req.params.id, { include: ['todo_items'] });
        res.status(200).json({
            success: 'Success',
            data: result,
        });
    } catch (error) {
        res.status(500).json({
            success: 'Failed',
            message: 'Failed to get activity',
        });
        console.log('>> Error while getting activity: ', error);
    }
};

const getActivity = async (req, res) => {
    try {
        const result = await Activity.findAndCountAll({ limit: 1000 });
        res.status(200).json({
            success: 'Success',
            total: result.count,
            data: result.rows,
        });
    } catch (error) {
        res.status(500).json({
            success: 'Failed',
            message: 'Failed to get activity',
        });
        console.log('>> Error while getting activity: ', error);
    }
};

module.exports = { createActivity, getActivityByid, updateActivity, deleteActivityById, getActivity };
