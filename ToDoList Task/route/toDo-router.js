const express = require('express');
const { request } = require('http');
const ToDo = require('../model/ToDo');

const router = express.Router();

router.get('/getAll', async (req, res) => {
    res.contentType('application/json')
        .status(200)
        .json(await ToDo.find());
});

router.get('/getById/:id', async (req, res, next) => {
    const id = req.params.id;

    const toDo = await ToDo.findById(id);

    if (toDo) {
        res.status(200).json(toDo);
    } else {
        next({ statusCode: 404, message: `ToDo with id ${id} does not exist`});
    }
});

router.post('/create', async (req, res, next) => {
    try {
        if (Object.keys(req.body).length == 0) return next({
            statusCode: 400, 
            message: 'Body cannot be empty'});
    
        const toDo = new ToDo(req.body);
        await toDo.save();
    
        res.status(201).json(ToDo);
    } catch (err) {
        next(err);
    }
});

router.put('/update/:id', async (req, res, next) => {
    try {
        if (Object.keys(req.body).length == 0) return next({
            statusCode: 400, 
            message: 'Body cannot be empty'});
        
        const toDo = await ToDo.updateOne({ _id: req.params.id }, req.body, {
            runValidators: true
        });
    
        if (toDo) {
            res.status(200).json(await ToDo.findById(req.params.id));
        } else {
            next({ statusCode: 400, message: `ToDo with id ${req.params.id} does not exist`});
        }
    } catch (err) {
        next(err);
    }
});

router.delete('/delete/:id', async (req, res, next) => {
    
    const id = req.params.id;

    const toDo = await ToDo.findByIdAndDelete(id);

    if (toDo) {
        res.status(200).json(toDo);
    } else {
        next({ statusCode: 404, message: `ToDo with id ${id} does not exist`});
    }
});

module.exports = router;