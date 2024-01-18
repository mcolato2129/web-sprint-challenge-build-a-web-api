const express = require('express');
const Actions = require('./actions-model')
const {
    validateActionsId,
    validateActions,
} = require('./actions-middlware')

const router = express.Router();

router.get('/relax', (req, res) => {
    res.send('Just Breathe. Keep your connection with Allah. He will take care of you')
})

router.get('/api/actions', (req, res, next) => {
    Actions.get()
        .then(actions => {
            res.send(actions)
        }).catch(next);
})

router.get('/api/actions/:id', validateActionsId, (req, res, next) => {
    res.json(req.action);
})

router.post('/api/actions', validateActions, (req, res, next) => {
    Actions.insert(req.body)
        .then(newAction => {
            res.status(201).json(newAction);
        }).catch(next);
})

router.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        customMessage: "projects inside actions router happened",
        message: err.message,
        stack: err.stack
    })
});

module.exports = router;