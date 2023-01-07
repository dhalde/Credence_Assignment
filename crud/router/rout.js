const express = require('express');
const router = express.Router();

const movieSchema = require('../models/movies');

router.post('/addmovie', async (req, res) => {
    try {
        req.body.summary = req.body.summary.slice(0, 200);

        const movies = new movieSchema(req.body);
        const data = await movies.save();
        res.status(201).send(data);

    } catch (e) {
        res.status(400).send(e);
    }


});

router.get('/getmovie', async (req, res) => {
    try {
        const movie = await movieSchema.find();
        res.send(movie);

    } catch (e) {
        res.send(e);
    }
});

router.get('/getmovie/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const oneData = await movieSchema.findById(id);
        res.status(500).send(oneData);

    } catch (error) {
        res.send(error);
    }
});


router.patch('/updatemovie/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updateData = await movieSchema.findByIdAndUpdate(id, req.body, {
            new: true
        });
        res.send(updateData);

    } catch (e) {
        res.status(404).send(e);
    }
});


router.delete('/deletemovie/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const dataDel = await movieSchema.findByIdAndDelete(id);
        if (!id) {
            return res.status(400).send();
        }
        res.send(dataDel);

    } catch (e) {
        res.status(501).send(e);

    }
});


module.exports = router;

