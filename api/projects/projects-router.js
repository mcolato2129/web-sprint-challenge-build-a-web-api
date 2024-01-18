const express = require('express');
 
const router = express.Router();

router.get('/right', (req,res) => {
    res.send('There is an enemy combarrrrrrrnnt to your left!!');
})

module.exports = router;