const express = require('express');
const router = express.Router();
const logger = require('../logger/index');
const movieSchema = require('../models/movies');

router.post('/movies', async (req, res) => {
    try {
        let name = req.body.name;
        let summary = req.body.summary;
        let imageUrl = req.body.img;

        name = name.trim();
        summary = summary.trim();
        imageUrl = imageUrl.trim();


        if (name.length == 0) {
            throw new Error('Name is required');
        }
        if (summary.length < 0 || summary.length > 500) {
            throw new Error('Summary is required and should be less than 500');
        }

        const movies = new movieSchema({
            name,
            img: imageUrl,
            summary: summary

        });
        await movies.save();
        res.status(200).json({
            message: 'Successfully Created'
        });


    } catch (e) {
        logger.error(e.message);
        res.status(400).json({
            message: e.message
        });
    }


});

router.get('/movies', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 3;
        let totalItems;

        totalItems = await movieSchema.countDocuments();

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const results = {}

        if (startIndex > 0) {
            results.previous = {
                page: page - 1,
                limit: limit
            }
        }

        if (endIndex < totalItems) {
            results.next = {
                page: page + 1,
                limit: limit
            }
        }


        results.results = await movieSchema.find().select('-__v').limit(limit).skip(startIndex)
        res.status(200).json(results);

    }
    catch (e) {
        logger.error(e.message);
        res.status(404).json({
            message: e.message,
        });

    }
});



router.get('/movies/:id', async (req, res) => {
    try {
        const movieId = req.params.id;
        const movie = await movieSchema.findById(movieId).select('-__v');
        res.json(movie);

    } catch (e) {
        res.json({
            message: e.message
        });
        logger.log('error', 'check the id used');
    }

});


router.put('/movies/:id', async (req, res) => {
    try {
        const id = req.params.id;

        let name = req.body.name;
        let summary = req.body.summary;
        let imageUrl = req.body.img;

        name = name.trim();
        summary = summary.trim();
        imageUrl = imageUrl.trim();


        if (name.length == 0) {
            throw new Error('Name is required');
        }
        if (summary.length < 0 || summary.length > 500) {
            throw new Error('Summary is required and should be less than 500');
        }


        await movieSchema.findByIdAndUpdate(id, {
            name,
            img: imageUrl,
            summary: summary

        });
        res.json({
            message: 'Data updated successfully'
        });

    } catch (e) {
        logger.error(e.message);
        res.status(404).json({
            message: e.message,
        });
    }
});


router.delete('/movies/:id', async (req, res) => {
    try {

        const id = req.params.id;
        const dataDel = await movieSchema.findByIdAndDelete(id);

        if (dataDel) {
            return res.status(200).json({
                message: 'Data deleted successfully'
            });
        }


        return res.status(400).json({
            message: 'Data Not found!'
        });



    } catch (e) {
        logger.error(e.message);
        res.status(400).json({
            message: e.message
        });

    }
});


module.exports = router;

