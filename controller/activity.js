const db = require('../models');

const Activity = db.activity;

const createActivity = async (req, res) => {
    try {
        if (req.body.title === undefined || req.body.title === '') {
            res.status(400).json({
                status: 'Bad Request',
                message: 'title cannot be null',
            });
            return;
        }
        const result = await Activity.create({ title: req.body.title, email: req.body.email });
        res.status(201).json({
            success: 'Success',
            status: 'Success',
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
        console.log('result', result);
        if (result[0] !== 1) {
            res.status(404).json({
                success: 'Failed',
                status: 'Not Found',
                message: `Activity with ID ${req.params.id} Not Found`,
            });
        } else {
            const updated = await Activity.findByPk(req.params.id);
            res.status(200).json({
                success: 'Success',
                status: 'Success',
                data: updated,
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
                status: 'Not Found',
                message: `Activity with ID ${req.params.id} Not Found`,
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
            message: 'Failed to delete activity',
        });
        console.log('>> Error while delete activity: ', error);
    }
};

const getActivityByid = async (req, res) => {
    try {
        const result = await Activity.findByPk(req.params.id, { include: ['todo_items'] });

        if (result === null) {
            res.status(404).json({
                success: 'Failed',
                status: 'Not Found',
                message: `Activity with ID ${req.params.id} Not Found`,
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
            status: 'Success',
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
