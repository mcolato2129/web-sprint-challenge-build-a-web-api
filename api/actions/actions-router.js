const express = require('express');
const Actions = require('./actions-model')

const router = express.Router();

router.get('/relax', (req, res) => {
    res.send('Just Breathe. Keep your connection with Allah. He will take care of you')
})

router.get('/api/actions', (req, res, next)=> {
    Actions.get()
        .then(actions => {
            res.send(actions)
        }).catch(next);
})

module.exports = router;